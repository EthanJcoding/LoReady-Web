'use client'

import { signIn, useSession } from 'next-auth/react'

export default function DemoAuthButton() {
  const callbackUrl = '/demo/dashboard'
  const session = useSession()

  if (session.data) return null

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center px-4 py-2 rounded border border-primary-accent bg-transparent hover:bg-white dark:hover:bg-white/5 transition-colors'
        onClick={() => signIn('credentials', { callbackUrl, username: 'demo' })}
      >
        <div className='font-medium text-primary-accent'>로그인없이 둘러보기</div>
      </button>
      <span className='absolute -top-1 -right-1 flex h-3 w-3'>
        <span className='animate-slow-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent/90 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-3 w-3 bg-primary-accent'></span>
      </span>
    </div>
  )
}
