'use client'
import Link from 'next/link'
import { useState } from 'react'
// import { useRouter } from 'next/router'
import { usePathname, useRouter } from 'next/navigation'

interface OwnProps {
  channelId: string
}
export default function Navigation({ channelId }: OwnProps) {
  const router = useRouter()

  const pathname = usePathname()
  const handleClick = (event: string) => {
    router.push(`/${channelId}/${event}`)
  }

  return (
    <nav className='border-b border-secondary-gray/50 dark:border-primary-gray/50'>
      <ul className='flex'>
        <li
          className={`px-4 py-1 ${pathname === `/${channelId}/dashboard` ? 'border-b-2 border-black font-bold' : ''}`}
        >
          <Link href={`/${channelId}/dashboard`} onClick={() => handleClick('dashboard')}>
            대시보드
          </Link>
        </li>
        <li className={`px-4 py-1 ${pathname === `/${channelId}/schedule` ? 'border-b-2 border-black font-bold' : ''}`}>
          <Link href={`/${channelId}/schedule`} onClick={() => handleClick('schedule')}>
            레이드 일정
          </Link>
        </li>
      </ul>
    </nav>
  )
}
