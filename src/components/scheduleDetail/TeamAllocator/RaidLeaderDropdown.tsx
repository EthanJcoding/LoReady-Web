import { updateRaidLeader } from '@/api/firebase'
import { useToast } from '@/hooks/useToast'
import { Character } from '@/types/schedule'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

interface Ownprops {
  scheduleId: string
  frontRaidLeader: Character
  setFrontRaidLeader: (arg0: Character) => void
  characters: Character[]
}

export default function RaidLeaderDropdown({ scheduleId, frontRaidLeader, setFrontRaidLeader, characters }: Ownprops) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toast = useToast()

  const handleRaidLeaderDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelection = async (character: Character) => {
    setFrontRaidLeader(character)
    await updateRaidLeader(scheduleId, character)
    setIsDropdownOpen(false)
    toast('수정되었습니다.', { type: 'success', duration: 5000 })
    // toast
  }

  return (
    <div className='relative inline-block'>
      <button
        onClick={handleRaidLeaderDropdownOpen}
        className='max-w-[12rem] truncate text-dark dark:text-light bg-transparent hover:bg-secondary-gray/50 font-medium h-10 md:px-4 md:py-2 px-2 border rounded transition text-xs sm:text-base'
      >
        공대장: {frontRaidLeader.character}
      </button>
      {isDropdownOpen && (
        <div className='absolute bottom-full mb-2 w-full rounded shadow bg-transparent border max-h-[8rem] overflow-y-scroll'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {characters.map((char, idx) => (
              <button
                onClick={() => handleSelection(char)}
                key={idx}
                className='flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-secondary-gray/50'
              >
                <div className='truncate'>{char.character}</div>
                {frontRaidLeader.character === char.character && <FaCheck />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
