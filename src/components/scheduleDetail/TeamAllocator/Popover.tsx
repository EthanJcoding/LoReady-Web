import { Character } from '@/types/raid'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ChaListInterface } from '@/types/ChaListInterface'
import { FaSort, FaCheck } from 'react-icons/fa'
import { addUserToRaid, deleteUserFromRaid, editPartyCharacter, getUserData } from '@/api/firebase'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { User } from '@/types/User'

interface OwnProps {
  targetCharacter: string
  isPopoverOpen: boolean
  setIsPopoverOpen: (arg0: boolean) => void
  dropdownSelectedCharacter: Character
  setDropdownSelectedCharacter: (arg0: Character) => void
  parties: { [key: string]: Character[] }
  isJoining: boolean
  setIsJoining: (arg0: boolean) => void
  scheduleId: string
}

const findParty = (targetCharacter: string, parties: { [key: string]: Character[] }) => {
  if (parties.party1.some(character => character.character === targetCharacter)) {
    return 'party1'
  }
  if (parties.party2.some(character => character.character === targetCharacter)) {
    return 'party2'
  }
  return null
}

export default function Popover({
  targetCharacter,
  isPopoverOpen,
  setIsPopoverOpen,
  dropdownSelectedCharacter,
  setDropdownSelectedCharacter,
  parties,
  isJoining,
  setIsJoining,
  scheduleId
}: OwnProps) {
  const { data: session } = useSession()
  const userId = session?.user.id
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [charList, setCharList] = useState<ChaListInterface[]>([])
  const [charactersLoaded, setCharactersLoaded] = useState(false)

  const handlePopover = () => {
    setIsPopoverOpen(false)
    setIsDropdownOpen(false)
    setIsJoining(false)
  }

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleChaSelect = (character: string) => {
    const data = { character, userId }
    setDropdownSelectedCharacter(data)
    setIsDropdownOpen(false)
  }

  const handleChaSelectBtn = async () => {
    const partyIdx = findParty(targetCharacter, parties)
    if (partyIdx) {
      await editPartyCharacter(scheduleId, partyIdx, dropdownSelectedCharacter, targetCharacter)
      window.location.reload()
    }
  }

  const handleDelete = async () => {
    const partyIdx = findParty(targetCharacter, parties)
    if (partyIdx) {
      await deleteUserFromRaid(scheduleId, partyIdx, targetCharacter, userId)
      window.location.reload()
    }
  }

  const handleCharSelectForJoining = (character: string) => {
    const data = { character, userId }
    setDropdownSelectedCharacter(data)
    setIsDropdownOpen(false)
  }

  const handleSaveJoin = async () => {
    if (parties.party1.length <= 3) {
      await addUserToRaid(scheduleId, 'party1', dropdownSelectedCharacter)
    } else {
      await addUserToRaid(scheduleId, 'party2', dropdownSelectedCharacter)
    }
    window.location.reload()
  }

  useEffect(() => {
    if (isDropdownOpen && !charactersLoaded) {
      const fetchCharacters = async () => {
        if (isJoining) {
          const { registeredBy } = (await getUserData(userId)) as User
          const list = await getCharacterList(registeredBy)
          setCharList(list)
        } else {
          const list = await getCharacterList(targetCharacter)
          setCharList(list)
        }
        setCharactersLoaded(true)
      }
      fetchCharacters()
    }
  }, [isDropdownOpen, charactersLoaded, isJoining, targetCharacter, userId])

  return (
    <>
      {isPopoverOpen && (
        <div className='absolute z-40 w-screen h-full bg-gray-900/30 top-0 left-0' onClick={handlePopover} />
      )}
      {isPopoverOpen && (
        <div className='z-50 border fixed top-1/2 left-1/2 w-[20rem] bg-light dark:bg-dark transform -translate-x-1/2 -translate-y-1/2 shadow-xl rounded flex flex-col p-4 space-y-4'>
          <button
            onClick={handleDropdown}
            className='w-full border p-2 rounded flex justify-between items-center hover:bg-secondary-gray/50 transition'
          >
            <div>{dropdownSelectedCharacter.character}</div>
            <FaSort />
          </button>
          {isDropdownOpen && (
            <div className='border rounded p-2 overflow-scroll space-y-2 absolute top-12 bg-light dark:bg-dark w-[18rem] h-[18rem]'>
              {charList.map((character, idx) => (
                <button
                  onClick={() =>
                    isJoining
                      ? handleCharSelectForJoining(character.CharacterName)
                      : handleChaSelect(character.CharacterName)
                  }
                  key={idx}
                  className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between'
                >
                  <div>{character.CharacterName}</div>
                  {dropdownSelectedCharacter.character === character.CharacterName && <FaCheck />}
                </button>
              ))}
            </div>
          )}
          <div className='flex w-full gap-4 justify-end'>
            {!isJoining && (
              <button
                onClick={handleDelete}
                className='truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-secondary-accent hover:bg-secondary-accent/50 text-xs md:text-sm font-semibold text-black'
              >
                삭제하기
              </button>
            )}
            <button
              onClick={isJoining ? handleSaveJoin : handleChaSelectBtn}
              className='truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-primary-accent hover:bg-secondary-gray/50 text-xs md:text-sm font-semibold'
            >
              {isJoining ? '참여하기' : '저장하기'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
