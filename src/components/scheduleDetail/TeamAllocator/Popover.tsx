import { Character } from '@/types/raid'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ChaListInterface } from '@/types/ChaListInterface'
import { FaSort, FaCheck } from 'react-icons/fa'
import { deleteUserFromRaid, editPartyCharacter } from '@/api/firebase'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Ownprops {
  selectedCharacter: Character
  isPopoverOpen: boolean
  setIsPopoverOpen: (arg0: boolean) => void
  dropdownSelectedCharacter: any
  setDropdownSelectedCharacter: any
  parties: { [key: string]: Character[] }
}

export default function Popover({
  selectedCharacter,
  isPopoverOpen,
  setIsPopoverOpen,
  dropdownSelectedCharacter,
  setDropdownSelectedCharacter,
  parties
}: Ownprops) {
  const params = useParams<{ channelId: string; scheduleId: string }>()
  const { scheduleId } = params
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [charList, setCharList] = useState<ChaListInterface[]>([])
  const userId = session?.user.id

  const handlePopover = () => {
    setIsPopoverOpen(false)
    setIsDropdownOpen(false)
  }

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    getCharacters()
  }

  const handleChaSelect = async (character: string) => {
    const data = { character, userId }

    setDropdownSelectedCharacter(data)
    // selectedCharacter의 파티 위치
    // 해당 파티 위치에 userId, characterName 으로 업데이트
    // 업데이트 후 리프레쉬
    setIsDropdownOpen(false)
  }

  const handleChaSelectBtn = async () => {
    function findParty(selectedCharacter: Character) {
      // party1에서 찾기
      const isInParty1 = parties.party1.some(character => character.character === selectedCharacter.character)
      if (isInParty1) {
        return 'party1'
      }

      // party2에서 찾기
      const isInParty2 = parties.party2.some(character => character.character === selectedCharacter.character)
      if (isInParty2) {
        return 'party2'
      }

      // 어느 party에도 속해있지 않으면 null 반환
      return null
    }

    const partyIdx = findParty(selectedCharacter)

    if (partyIdx) {
      await editPartyCharacter(scheduleId, partyIdx, dropdownSelectedCharacter, selectedCharacter.character)
      window.location.reload()
    }
  }

  const getCharacters = async () => {
    const data = await getCharacterList(selectedCharacter.character)
    setCharList(data)
  }

  const handleDelete = async () => {
    function findParty(selectedCharacter: Character) {
      // party1에서 찾기
      const isInParty1 = parties.party1.some(character => character.character === selectedCharacter.character)
      if (isInParty1) {
        return 'party1'
      }

      // party2에서 찾기
      const isInParty2 = parties.party2.some(character => character.character === selectedCharacter.character)
      if (isInParty2) {
        return 'party2'
      }

      // 어느 party에도 속해있지 않으면 null 반환
      return null
    }

    const partyIdx = findParty(selectedCharacter)

    if (partyIdx) {
      await deleteUserFromRaid(scheduleId, partyIdx, selectedCharacter.character, userId)
      window.location.reload()
    }
  }

  return (
    <>
      <div
        className={isPopoverOpen ? 'absolute z-40 w-screen h-full bg-gray-900/30 top-0 left-0' : 'hidden'}
        onClick={() => handlePopover()}
      ></div>
      <div
        className={
          isPopoverOpen
            ? 'z-50 border fixed top-1/2 left-1/2 w-[20rem] bg-light dark:bg-dark transform -translate-x-1/2 -translate-y-1/2 shadow-xl rounded flex flex-col p-4 space-y-4'
            : 'hidden'
        }
      >
        <button
          onClick={() => handleDropdown()}
          className='w-full border p-2 rounded flex justify-between items-center hover:bg-secondary-gray/50 transition'
        >
          <div>{dropdownSelectedCharacter.character}</div>
          <div>
            <FaSort />
          </div>
        </button>
        <div
          className={
            isDropdownOpen
              ? 'border rounded p-2 overflow-scroll space-y-2 absolute top-12 bg-light dark:bg-dark w-[18rem] h-[18rem]'
              : 'hidden'
          }
        >
          {charList.map((character, idx) => {
            return (
              <button
                onClick={() => handleChaSelect(character.CharacterName)}
                key={idx}
                className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between'
              >
                <div>{character.CharacterName}</div>
                {dropdownSelectedCharacter.character === character.CharacterName ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
        <div className='flex w-full gap-4 justify-end'>
          <button
            onClick={() => handleDelete()}
            className='truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-secondary-accent hover:bg-secondary-accent/50 text-xs md:text-sm font-semibold text-black'
          >
            삭제하기
          </button>
          <button
            onClick={() => handleChaSelectBtn()}
            className='truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-transparent hover:bg-secondary-gray/50 text-xs md:text-sm font-semibold'
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  )
}
