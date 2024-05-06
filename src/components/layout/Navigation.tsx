'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function Navigation() {
  const { channelId } = useParams()
  const pathname = usePathname()

  return (
    <nav className='border-b border-secondary-gray/50 dark:border-primary-gray/50'>
      <ul className='flex'>
        <li
          className={`px-4 py-1 border-dark dark:border-light ${
            pathname === `/${channelId}/dashboard` ? 'border-b-2 font-bold' : 'font-medium'
          }`}
        >
          <Link href={`/${channelId}/dashboard`}>대시보드</Link>
        </li>
        <li
          className={`px-4 py-1 border-dark dark:border-light ${
            pathname === `/${channelId}/schedule` ? 'border-b-2 font-bold' : 'font-medium'
          }`}
        >
          <Link href={`/${channelId}/schedule`}>레이드 일정</Link>
        </li>
      </ul>
    </nav>
  )
}
