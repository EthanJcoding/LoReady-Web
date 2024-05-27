'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import ScheduleDeleteBtn from '../scheduleDetail/ScheduleDelete/ScheduleDeleteBtn'
import { useState } from 'react'
import DeleteModal from '../scheduleDetail/ScheduleDelete/DeleteModal'

export default function Navigation() {
  const { channelId } = useParams()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='border-b border-secondary-gray/50 dark:border-primary-gray/50 flex items-center justify-between'>
      <ul className='flex'>
        <li
          className={`px-4 py-1 border-dark dark:border-light ${
            pathname.includes('dashboard') ? 'border-b-2 font-bold' : 'font-medium'
          }`}
        >
          <Link href={`/${channelId}/dashboard`}>대시보드</Link>
        </li>
        <li
          className={`px-4 py-1 border-dark dark:border-light  ${
            pathname.includes('schedule') ? 'border-b-2 font-bold' : 'font-medium'
          }`}
        >
          <Link href={`/${channelId}/schedule`}>레이드 일정</Link>
        </li>
      </ul>
      <ScheduleDeleteBtn setIsOpen={setIsOpen} />
      {isOpen && <DeleteModal setIsOpen={setIsOpen} />}
    </nav>
  )
}
