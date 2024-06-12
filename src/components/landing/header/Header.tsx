'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from '@/components/layout/sidebar/ThemeButton'
import AuthButton from '@/components/auth/AuthButton'
import { useSession } from 'next-auth/react'
import { getUserData } from '@/api/firebase'
import { useEffect, useState } from 'react'
import { User } from '@/types/users'

function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className='transition hover:bg-secondary-gray/50 rounded px-2 hidden sm:flex' href={href}>
      {children}
    </Link>
  )
}

export default function Header() {
  const { data: session } = useSession()
  const [channelId, setChannelId] = useState<string | null>(null)

  useEffect(() => {
    const getChannel = async () => {
      if (session?.user.id) {
        const userId = session.user.id
        const { channels } = (await getUserData(userId)) as User
        setChannelId(channels[0] || null)
      }
    }

    getChannel()
  }, [session?.user.id])

  return (
    <header className='flex justify-between w-full'>
      <div className='flex space-x-4 items-center '>
        <Link className='w-28 pt-0.5' href='/'>
          <Image className='w-full h-full' src='/images/logo.svg' alt='로레디 로고' width={100} height={50} priority />
        </Link>
        <div className='shrink-0 h-full w-[1px] border-l hidden sm:flex'></div>

        <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string}>사용법</HeaderLink>
        <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
        {session && <HeaderLink href={`/${channelId}/dashboard`}>대시보드</HeaderLink>}
      </div>
      <div className='flex items-center gap-4'>
        <ThemeButton />
        <AuthButton />
      </div>
    </header>
  )
}
