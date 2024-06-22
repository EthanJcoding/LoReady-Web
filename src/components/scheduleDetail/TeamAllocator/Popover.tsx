import { Character } from '@/types/raid'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ChaListInterface } from '@/types/characterList'
import { FaSort, FaCheck } from 'react-icons/fa'
import { addUserToRaid, deleteUserFromRaid, editPartyCharacter, getUserData } from '@/api/firebase'
import { useState, useEffect } from 'react'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import { useToast } from '@/hooks/useToast'
import { getCharacterData } from '@/api/lostark/getCharacterData'

interface OwnProps {
  targetCharacter: string
  isPopoverOpen: boolean
  setIsPopoverOpen: (arg0: boolean) => void
  dropdownSelectedCharacter: Character
  setDropdownSelectedCharacter: (arg0: Character) => void
  partyData: { [key: string]: Character[] }
  setPartyData: (arg0: { [key: string]: Character[] }) => void
  isJoining: boolean
  setIsJoining: (arg0: boolean) => void
  scheduleId: string
  userData: Session | null
  setIsUserIdExist: (arg0: boolean) => void
  setSelectedCharacter: (arg0: Character) => void
  characterList: Character[]
  setCharacterList: (arg0: Character[]) => void
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
  partyData,
  setPartyData,
  isJoining,
  setIsJoining,
  scheduleId,
  userData,
  setIsUserIdExist,
  setSelectedCharacter,
  characterList,
  setCharacterList
}: OwnProps) {
  const userId = userData?.user.id
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [charList, setCharList] = useState<ChaListInterface[]>([])
  const [charactersLoaded, setCharactersLoaded] = useState(false)
  const toast = useToast()

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

  const handlePopover = () => {
    setIsPopoverOpen(false)
    setIsDropdownOpen(false)
    setIsJoining(false)
  }

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleCharSelectForJoining = async (character: string) => {
    const data = await getCharacterData(character)
    const charData = { character, userId, data }

    setDropdownSelectedCharacter(charData)
    setIsDropdownOpen(false)
  }

  const handleDelete = async () => {
    const partyIdx = findParty(targetCharacter, partyData)

    if (partyIdx === 'party1') {
      const copyArr = [...partyData.party1].filter((char: Character) => char.character !== targetCharacter)
      setPartyData({ party1: copyArr, party2: partyData.party2 })
      await deleteUserFromRaid(scheduleId, partyIdx, targetCharacter, userId)
      toast('삭제되었습니다.', { type: 'success', duration: 5000 })
      setIsPopoverOpen(false)
      setIsUserIdExist(false)

      if (partyData[partyIdx].length > 0) {
        setSelectedCharacter(partyData[partyIdx][0])
      }
    }
    if (partyIdx === 'party2') {
      const copyArr = [...partyData.party2].filter((char: Character) => char.character !== targetCharacter)
      setPartyData({ party2: copyArr, party1: partyData.party1 })
      await deleteUserFromRaid(scheduleId, partyIdx, targetCharacter, userId)
      toast('삭제되었습니다.', { type: 'success', duration: 5000 })
      setIsPopoverOpen(false)
      setIsUserIdExist(false)

      if (partyData[partyIdx].length > 0) {
        setSelectedCharacter(partyData[partyIdx][0])
      }
    }

    const copiedList = [...characterList].filter(char => char.character !== targetCharacter)

    setCharacterList(copiedList)
  }

  const handleChaSelectBtn = async () => {
    const partyIdx = findParty(targetCharacter, partyData)
    if (partyIdx) {
      const copyObj = { ...partyData }
      const filteredArr = copyObj[partyIdx].filter((char: Character) => char.character !== targetCharacter)
      filteredArr.push(dropdownSelectedCharacter)

      copyObj[partyIdx] = filteredArr

      const pushingData = { userId: dropdownSelectedCharacter.userId, character: dropdownSelectedCharacter.character }

      await editPartyCharacter(scheduleId, partyIdx, pushingData, targetCharacter)
      toast('저장되었습니다.', { type: 'success', duration: 5000 })
      setIsPopoverOpen(false)
      setPartyData(copyObj)
      setSelectedCharacter(dropdownSelectedCharacter)
    }
  }

  const handleSaveJoin = async () => {
    if (partyData.party1.length <= 3) {
      await addUserToRaid(scheduleId, 'party1', dropdownSelectedCharacter)
      const pushingData = [...partyData.party1, dropdownSelectedCharacter]
      setPartyData({ party1: pushingData, party2: partyData.party2 })
    } else {
      await addUserToRaid(scheduleId, 'party2', dropdownSelectedCharacter)
      const pushingData = [...partyData.party2, dropdownSelectedCharacter]
      setPartyData({ party2: pushingData, party1: partyData.party1 })
    }
    toast('저장되었습니다.', { type: 'success', duration: 5000 })
    setIsPopoverOpen(false)
    setIsJoining(false)
    setIsUserIdExist(true)
    setSelectedCharacter(dropdownSelectedCharacter)

    const copiedList = [
      ...characterList,
      { character: dropdownSelectedCharacter.character, userId: dropdownSelectedCharacter.userId }
    ]

    setCharacterList(copiedList)
  }

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
            <div className='border rounded p-2 overflow-y-scroll space-y-2 absolute top-12 bg-light dark:bg-dark w-[18rem] h-[12rem]'>
              {charList.map((character, idx) => (
                <button
                  onClick={() => handleCharSelectForJoining(character.CharacterName)}
                  key={idx}
                  className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between gap-2'
                >
                  {dropdownSelectedCharacter.character === character.CharacterName && <FaCheck color='#00a4e8' />}
                  <div className='flex justify-between w-full items-center'>
                    <span className='text-sm'>{character.CharacterName}</span>
                    <span className='text-xs'>{character.ItemAvgLevel}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className='flex w-full gap-4 justify-end'>
            {!isJoining && (
              <button
                onClick={handleDelete}
                className='truncate text-dark bg-secondary-accent hover:bg-secondary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-xs sm:text-base'
              >
                삭제하기
              </button>
            )}
            <button
              onClick={isJoining ? handleSaveJoin : handleChaSelectBtn}
              className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-xs sm:text-base'
            >
              {isJoining ? '참여하기' : '저장하기'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
