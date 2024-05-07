'use client'

import { useToggleStore } from '@/stores/toggle'
import { BsCheckCircleFill } from 'react-icons/bs'

export default function ToggleBtn() {
  const { isActive, setIsActive } = useToggleStore(state => state)

  return (
    <button className='flex items-center gap-1' onClick={setIsActive}>
      <span className={`${isActive ? 'text-primary-accent' : 'text-gray-300'} text-xl`}>
        <BsCheckCircleFill />
      </span>
      <span>내 일정만 보기</span>
    </button>
  )
}
