import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from '@/components/layout/sidebar/ThemeButton'
import AuthButton from '@/components/auth/AuthButton'

export default function Header() {
  return (
    <header className='flex justify-between'>
      <div className='flex space-x-4 items-center '>
        <Link className='w-28 pt-0.5' href='/'>
          <Image className='w-full h-full' src='/images/logo.svg' alt='로레디 로고' width={100} height={50} priority />
        </Link>
        <div className='shrink-0 h-full w-[1px] border-l'> {/* 단순 separator */}</div>

        <Link className='transition hover:bg-secondary-gray/50 rounded px-2' href='/1209059689657016371/dashboard'>
          사용법
        </Link>
        <Link className='transition hover:bg-secondary-gray/50 rounded px-2' href='/1209059689657016371/dashboard'>
          봇 추가하기
        </Link>
        <Link className='transition hover:bg-secondary-gray/50 rounded px-2' href='/1209059689657016371/dashboard'>
          대시보드
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeButton />
        <AuthButton />
      </div>
    </header>
  )
}
