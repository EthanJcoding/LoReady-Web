import SignIn from '@/components/auth/SignIn'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '로그인 - 로레디',
  description: '로그인이 필요합니다.'
}

export default async function () {
  const session = await getServerSession()

  if (session) redirect('/')

  return (
    <div className='h-dvh flex justify-center items-center bg-light dark:bg-dark'>
      <SignIn />
    </div>
  )
}
