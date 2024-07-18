import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from '@/components/layout/sidebar/ThemeButton'
import AuthButton from '@/components/auth/AuthButton'
import Gnb from './Gnb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className='flex justify-between w-full'>
      <nav className='flex space-x-4 items-center'>
        <Link className='w-28 pt-0.5' href='/'>
          <Image className='w-full h-full' src='/images/logo.svg' alt='로레디 로고' width={100} height={50} priority />
        </Link>
        <div className='shrink-0 h-full w-[1px] border-l dark:border-primary-gray/50 hidden sm:flex'></div>
        <Gnb />
      </nav>
      <div className='flex items-center gap-4 max-sm:gap-3'>
        <ThemeButton />
        <AuthButton session={session} />
      </div>
    </header>
  )
}
