import useCharacterStore from '@/stores/characterStore'
import useDropdonwStore from '@/stores/dropdownStore'
import { useScheduleStore } from '@/stores/scheduleStore'
import { Character } from '@/types/schedule'
import { FaRegCaretSquareDown, FaArrowDown, FaArrowUp, FaRegCaretSquareUp } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { PiCrownSimpleFill } from 'react-icons/pi'

interface Ownprops {
  raidType: '4인레이드' | '8인레이드'
  userId: string
  isPopoverOpen: boolean
  setIsPopoverOpen: (arg0: boolean) => void
}
export default function PartyList({ raidType, userId, isPopoverOpen, setIsPopoverOpen }: Ownprops) {
  const { schedule, moveMemberBetweenParties, moveMemberDown, moveMemberUp } = useScheduleStore()
  const { selectedCharacter, setSelectedCharacter } = useCharacterStore()
  const { setDropdownSelectedCharacter } = useDropdonwStore()

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character)
  }

  const isSelected = (character: string) => {
    if (character === selectedCharacter?.character) {
      return true
    } else return false
  }

  const isUserCharacter = (character: Character) => {
    return userId === character.userId ? true : false
  }

  const handleCharacterSetting = (character: Character) => {
    setSelectedCharacter(character)
    setDropdownSelectedCharacter(character)
    setIsPopoverOpen(!isPopoverOpen)
  }

  if (raidType === '4인레이드' && schedule) {
    return (
      <div className='w-full h-full space-y-2'>
        <span className='text-lg font-semibold'>파티 리스트</span>
        {schedule.parties.party1.map((member, idx) => {
          return (
            <div
              key={idx}
              className={
                isSelected(member.character)
                  ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent'
                  : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
              }
            >
              <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                <div>{idx + 1}.</div>
                {schedule.raidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                <div className='truncate'>{member.character}</div>
              </button>
              <div className='flex space-x-2'>
                {isUserCharacter(member) ? (
                  <button onClick={() => handleCharacterSetting(member)}>
                    <FaGear />
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (raidType === '8인레이드' && schedule) {
    return (
      <>
        <div className='w-full sm:h-1/2 space-y-2'>
          <span className='text-lg font-semibold '>1번 파티</span>
          {schedule.parties.party1.map((member, idx) => {
            return (
              <div
                key={idx}
                className={
                  isSelected(member.character)
                    ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent'
                    : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
                }
              >
                <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                  <div>{idx + 1}.</div>
                  {schedule.raidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                  <div className=''>{member.character}</div>
                </button>
                <div className='flex space-x-2'>
                  <button onClick={() => moveMemberBetweenParties('party1', 'party2', idx)}>
                    <FaRegCaretSquareDown />
                  </button>
                  <button onClick={() => moveMemberDown('party1', idx)}>
                    <FaArrowDown />
                  </button>
                  <button onClick={() => moveMemberUp('party1', idx)}>
                    <FaArrowUp />
                  </button>
                  {isUserCharacter(member) ? (
                    <button onClick={() => handleCharacterSetting(member)}>
                      <FaGear />
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-full sm:h-1/2 space-y-2'>
          <span className='text-lg font-semibold'>2번 파티</span>
          {schedule.parties.party2.map((member, idx) => {
            return (
              <div
                key={idx}
                className={
                  isSelected(member.character)
                    ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent '
                    : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
                }
              >
                <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                  <div>{idx + 1}.</div>
                  {schedule.raidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                  <div className='truncate'>{member.character}</div>
                </button>
                <div className='flex space-x-2'>
                  <button onClick={() => moveMemberBetweenParties('party2', 'party1', idx)}>
                    <FaRegCaretSquareUp />
                  </button>
                  <button onClick={() => moveMemberDown('party1', idx)}>
                    <FaArrowDown />
                  </button>
                  <button onClick={() => moveMemberUp('party1', idx)}>
                    <FaArrowUp />
                  </button>
                  {isUserCharacter(member) ? (
                    <button onClick={() => handleCharacterSetting(member)}>
                      <FaGear />
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
