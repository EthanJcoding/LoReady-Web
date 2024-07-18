'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FaDiscord } from 'react-icons/fa'
import Profile from './Profile'
import { Session } from 'next-auth'

interface Ownprops {
  session?: Session | null
}

export default function AuthButton({ session }: Ownprops) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('redirect_url') || ''

  if (session) {
    return <Profile session={session} />
  }

  return (
    <button
      className='w-full bg-indigo-500 inline-flex items-center justify-center whitespace-nowrap space-x-2 px-4 h-10 rounded-lg hover:bg-indigo-500/90 transition'
      onClick={() => signIn('discord', { callbackUrl })}
    >
      <FaDiscord color='white' className='w-6 h-6' />
      <div className='text-sm text-white font-semibold'>Discord로 로그인</div>
    </button>
  )
}
