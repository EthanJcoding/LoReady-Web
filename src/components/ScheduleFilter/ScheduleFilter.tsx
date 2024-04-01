'use client'
import { useState } from 'react'
import { useRaidClearFilterStore } from '@/stores/raidClearFilter'

export default function SchedulesFilter() {
  const { filter, setFilter } = useRaidClearFilterStore()
  const [isChecked, setIsChecked] = useState(filter === 'clearParty')

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.checked ? 'clearParty' : 'allParty'
    setFilter(newFilter)
    setIsChecked(e.target.checked)
  }

  return (
    <div>
      <label>
        완료파티 제외
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
      </label>
    </div>
  )
}
