'use client'

import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { FaDiscord } from 'react-icons/fa'
import Profile from './Profile'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return <Profile />
  }
  return (
    <button
      className='bg-indigo-500 flex items-center justify-start space-x-4 p-4 rounded-lg px-8 w-full hover:bg-indigo-500/75 transition'
      onClick={() => signIn('discord')}
    >
      <FaDiscord color='white' className='w-8 h-8' />
      <div className='text-sm text-white font-semibold'>디스코드로 로그인</div>
    </button>
  )
}
