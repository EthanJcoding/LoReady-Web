'use client'

import { getUserData } from '@/api/firebase'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import HeaderLink from './HeaderLink'
import { useEffect } from 'react'

interface Ownprops {
  session: Session
}

export default function Gnb({ session }: Ownprops) {
  let dashboardUrl = ''

  useEffect(() => {
    const fetchChannel = async () => {
      if (session) {
        const { channels } = (await getUserData(session.user.id)) as User
        dashboardUrl = `/${channels[0]}/dashboard`
      }
    }

    fetchChannel()
  }, [])

  return (
    <ul className='gap-4 sm:flex hidden'>
      <li className='lg:flex hidden'>
        <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string} target='_blank'>
          사용법
        </HeaderLink>
      </li>
      <li className='lg:flex hidden'>
        <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
      </li>
      <li className='flex'>
        <HeaderLink href='/characters'>유저 검색</HeaderLink>
      </li>
      {session && (
        <li className='flex'>
          <HeaderLink href={dashboardUrl}>대시보드</HeaderLink>
        </li>
      )}
    </ul>
  )
}
