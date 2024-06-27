import { ChaListInterface } from '@/types/characterList'
import { FaSort, FaCheck } from 'react-icons/fa'
import { addUserToRaid, deleteUserFromRaid, editPartyCharacter, getUserData } from '@/api/firebase'
import { useState } from 'react'
import { Session } from 'next-auth'
import { useToast } from '@/hooks/useToast'
import { getCharacterData } from '@/api/lostark/getCharacterData'
import { useSchedule } from '@/hooks/useSchedule'
import useDropdonwStore from '@/stores/dropdownStore'
import { useScheduleStore } from '@/stores/scheduleStore'
import useCharacterStore from '@/stores/characterStore'
import { useCharacterList } from '@/hooks/useCharacterList'

interface OwnProps {
  isPopoverOpen: boolean
  setIsPopoverOpen: (arg0: boolean) => void
  isJoining: boolean
  setIsJoining: (arg0: boolean) => void
  scheduleId: string
  userData: Session | null
}

function checkCharacterRaidEligibility(characterList: ChaListInterface[], raidName: string | undefined) {
  switch (raidName) {
    case '발탄 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1415)
    case '발탄 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1445)
    case '비아키스 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1430)
    case '비아키스 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1460)
    case '쿠크세이튼':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1430)
    case '아브렐슈드 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1520)
    case '아브렐슈드 [하12노3]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1540)
    case '카양겔 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1540)
    case '아브렐슈드 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1560)
    case '카양겔 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1580)
    case '일리아칸 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1580)
    case '일리아칸 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1600)
    case '상아탑 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1600)
    case '상아탑 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1620)
    case '카멘 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1610)
    case '카멘 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1630)
    case '에키드나 [노말]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1620)
    case '에키드나 [하드]':
      return characterList.filter(char => parseFloat(char.ItemAvgLevel.replace(/,/g, '')) > 1630)
    default:
      return characterList
  }
}

export default function Popover({
  userData,
  scheduleId,
  isPopoverOpen,
  setIsPopoverOpen,
  isJoining,
  setIsJoining
}: OwnProps) {
  const userId = userData?.user.id
  const { selectedCharacter, setSelectedCharacter } = useCharacterStore()
  const { characterList } = useCharacterList(isJoining ? userId : selectedCharacter?.userId)
  const { dropdownSelectedCharacter, setDropdownSelectedCharacter } = useDropdonwStore()
  const { schedule } = useScheduleStore()
  const { updateSchedule } = useSchedule(scheduleId)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toast = useToast()

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
    if (schedule && selectedCharacter) {
      await deleteUserFromRaid(scheduleId, selectedCharacter, schedule.parties)
      setIsPopoverOpen(false)
      setSelectedCharacter(schedule.characters[0])
      updateSchedule()
      toast('삭제되었습니다.', { type: 'success', duration: 5000 })
    }
  }

  const handleChaSelectBtn = async () => {
    if (schedule && dropdownSelectedCharacter && selectedCharacter) {
      const pushingData = { userId: dropdownSelectedCharacter.userId, character: dropdownSelectedCharacter.character }
      await editPartyCharacter(scheduleId, pushingData, selectedCharacter.character, schedule.parties)
      setIsPopoverOpen(false)
      setIsJoining(false)
      setSelectedCharacter(dropdownSelectedCharacter)
      updateSchedule()
      toast('저장되었습니다.', { type: 'success', duration: 5000 })
    }
  }

  const handleSaveJoin = async () => {
    if (schedule && dropdownSelectedCharacter && dropdownSelectedCharacter.userId !== '0') {
      if (schedule.parties.party1.length <= 3) {
        await addUserToRaid(scheduleId, 'party1', dropdownSelectedCharacter)
      } else {
        await addUserToRaid(scheduleId, 'party2', dropdownSelectedCharacter)
      }
      setIsPopoverOpen(false)
      setIsJoining(false)
      setSelectedCharacter(dropdownSelectedCharacter)
      toast('저장되었습니다.', { type: 'success', duration: 5000 })
      updateSchedule()
    } else {
      toast('캐릭터를 선택해주세요.', { type: 'fail', duration: 5000 })
    }
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
            <div>{dropdownSelectedCharacter?.character}</div>
            <FaSort />
          </button>
          {isDropdownOpen && (
            <div className='border rounded p-2 overflow-y-auto space-y-2 absolute top-12 bg-light dark:bg-dark w-[17.8rem] max-h-[12rem]'>
              {checkCharacterRaidEligibility(characterList, schedule?.raidName).map(
                (character: ChaListInterface, idx: number) => (
                  <button
                    onClick={() => handleCharSelectForJoining(character.CharacterName)}
                    key={idx}
                    className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between gap-2'
                  >
                    {dropdownSelectedCharacter?.character === character.CharacterName && <FaCheck color='#00a4e8' />}
                    <div className='flex justify-between w-full items-center'>
                      <span className='text-sm'>{character.CharacterName}</span>
                      <span className='text-xs'>{character.ItemAvgLevel}</span>
                    </div>
                  </button>
                )
              )}
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
