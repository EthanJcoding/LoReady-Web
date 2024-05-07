'use client'

import { useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'

export default function ToggleBtn() {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <button className='flex items-center gap-1' onClick={handleToggle}>
      <span className={`${isActive ? 'text-primary-accent' : 'text-gray-300'} text-xl`}>
        <BsCheckCircleFill />
      </span>
      <span>내 일정만 보기</span>
    </button>
  )
}
