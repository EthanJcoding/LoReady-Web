'use client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()

  return (
    <div className='flex w-full space-x-4 p-4 px-8'>
      <Image
        src={session?.user.image}
        width={10}
        height={10}
        className='w-10 h-10 rounded-full'
        alt='user profile image'
      />
      <button
        className='bg-indigo-500 flex items-center justify-center p-2 rounded-lg w-full  hover:bg-indigo-500/75 transition'
        onClick={() => signOut()}
      >
        <div className='text-sm text-white font-semibold'>로그아웃</div>
      </button>
    </div>
  )
}
