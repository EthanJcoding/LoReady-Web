'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface Ownprops {
  session: Session
}

export default function Profile({ session }: Ownprops) {
  return (
    <div className='flex gap-4 justify-center'>
      <Image
        src={session.user.image}
        width={150}
        height={150}
        className='w-10 h-10 rounded-full'
        alt='user profile image'
      />
      <button
        className='w-full bg-indigo-500 inline-flex items-center justify-center whitespace-nowrap space-x-2 px-4 h-10 rounded-lg hover:bg-indigo-500/90 transition'
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <div className='text-sm text-white font-semibold'>
          {session.user.id === 'demo' ? '둘러보기 종료' : '로그아웃'}
        </div>
      </button>
    </div>
  )
}
