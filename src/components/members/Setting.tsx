'use client'

import { useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import SettingModal from './SettingModal'
import { Session } from 'next-auth'

interface Ownprops {
  registeredBy: string
  session: Session | null
}

export default function Setting({ registeredBy, session }: Ownprops) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div className='absolute'>
        <FaGear onClick={() => handleOnClick()} role='button' />
      </div>
      {isOpen && <SettingModal setIsOpen={setIsOpen} registeredBy={registeredBy} session={session} />}
    </>
  )
}
