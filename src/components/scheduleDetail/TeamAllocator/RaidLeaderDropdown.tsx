import { updateRaidLeader } from '@/api/firebase'
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

  const handleRaidLeaderDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelection = async (character: Character) => {
    setFrontRaidLeader(character)
    await updateRaidLeader(scheduleId, character)
    setIsDropdownOpen(false)
    // toast
  }

  return (
    <div className='relative inline-block'>
      <button
        onClick={handleRaidLeaderDropdownOpen}
        className='w-[8rem] truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-transparent hover:bg-secondary-gray/50 text-xs md:text-sm font-semibold'
      >
        공대장: {frontRaidLeader.character}
      </button>
      {isDropdownOpen && (
        <div className='absolute bottom-full mb-2 w-full rounded shadow bg-transparent border'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {characters.map((char, idx) => (
              <button
                onClick={() => handleSelection(char)}
                key={idx}
                className='flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-secondary-gray/50'
              >
                <div>{char.character}</div>
                {frontRaidLeader.character === char.character && <FaCheck />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
