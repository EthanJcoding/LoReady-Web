'use client'
import Link from 'next/link'
import { useState } from 'react'

interface OwnProps {
  channelId: string
}
export default function Navigation() {
  const [navTap, setNabTap] = useState('dashboard')

  const handleClick = (event: string) => {
    setNabTap(event)
  }

  const channelId = 'channelId'

  return (
    <nav className='border-b border-secondary-gray/50 dark:border-primary-gray/50'>
      <ul className='flex'>
        <li className={`px-4 py-1 ${navTap === 'dashboard' ? 'border-b-2 border-black font-bold' : ''}`}>
          <Link href={`/${channelId}/dashboard`} onClick={() => handleClick('dashboard')}>
            대시보드
          </Link>
        </li>
        <li className={`px-4 py-1 ${navTap === 'schedule' ? 'border-b-2 border-black font-bold' : ''}`}>
          <Link href={`/${channelId}/schedule`} onClick={() => handleClick('schedule')}>
            레이드 일정
          </Link>
        </li>
      </ul>
    </nav>
  )
}
