'use client'

import { getUserData } from '@/api/firebase'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import HeaderLink from './HeaderLink'
import { useEffect, useState } from 'react'

interface Ownprops {
  session: Session
}

export default function GnbMobile({ session }: Ownprops) {
  const [dashboardUrl, setDashboardUrl] = useState<string>('')

  useEffect(() => {
    const fetchChannel = async () => {
      if (session) {
        const { channels } = (await getUserData(session.user.id)) as User
        setDashboardUrl(`/${channels[0]}/dashboard`)
      }
    }

    fetchChannel()
  }, [])

  return (
    <ul className='gap-4 flex flex-col'>
      <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string} target='_blank'>
        사용법
      </HeaderLink>
      <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
      <HeaderLink href='/characters'>유저 검색</HeaderLink>
      {session && <HeaderLink href={dashboardUrl}>대시보드</HeaderLink>}
    </ul>
  )
}
