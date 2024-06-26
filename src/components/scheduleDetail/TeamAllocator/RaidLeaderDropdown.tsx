import { updateRaidLeader } from '@/api/firebase'
import { useSchedule } from '@/hooks/useSchedule'
import { useToast } from '@/hooks/useToast'
import { Character } from '@/types/schedule'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

interface Ownprops {
  scheduleId: string
}

export default function RaidLeaderDropdown({ scheduleId }: Ownprops) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { schedule, updateSchedule } = useSchedule(scheduleId)
  const toast = useToast()

  const handleRaidLeaderDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelection = async (character: Character) => {
    await updateRaidLeader(scheduleId, character)
    setIsDropdownOpen(false)
    updateSchedule()
    toast('수정되었습니다.', { type: 'success', duration: 5000 })
  }

  return (
    <div className='relative inline-block'>
      <button
        onClick={handleRaidLeaderDropdownOpen}
        className='max-w-[16rem] truncate text-dark dark:text-light bg-transparent hover:bg-secondary-gray/50 font-medium h-10 md:px-4 md:py-2 px-2 border rounded transition text-xs sm:text-base'
      >
        공대장: {schedule?.raidLeader.character}
      </button>
      {isDropdownOpen && (
        <div className='absolute bottom-full mb-2 w-full rounded shadow bg-transparent border max-h-[8rem] overflow-y-scroll'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {schedule?.characters.map((char, idx) => (
              <button
                onClick={() => handleSelection(char)}
                key={idx}
                className='flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-secondary-gray/50'
              >
                <div className='truncate'>{char.character}</div>
                {schedule.raidLeader.character === char.character && <FaCheck />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
