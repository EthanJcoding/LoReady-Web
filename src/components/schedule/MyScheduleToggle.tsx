'use client'

import { useToggleStore } from '@/stores/toggle'
import { BsCheckCircleFill } from 'react-icons/bs'

export default function MyScheduleToggle() {
  const { isActive, setIsActive } = useToggleStore(state => state)

  return (
    <button className='flex items-center gap-1' onClick={setIsActive}>
      <span className={`${isActive ? 'text-primary-accent' : 'text-gray-300'} text-xl`}>
        <BsCheckCircleFill />
      </span>
      <span className={`${isActive ? 'font-medium' : 'font-normal'} pt-[1px]`}>내 일정만 보기</span>
    </button>
  )
}
