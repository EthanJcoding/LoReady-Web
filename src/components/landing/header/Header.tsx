import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from '@/components/layout/sidebar/ThemeButton'
import AuthButton from '@/components/auth/AuthButton'
import { getUserData } from '@/api/firebase'
import { User } from '@/types/users'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

function HeaderLink({
  href,
  children,
  isDisabled = false
}: {
  href: string
  children: React.ReactNode
  isDisabled?: boolean
}) {
  return (
    <Link
      className={`transition hover:bg-secondary-gray/50 rounded px-2 hidden sm:flex ${
        isDisabled ? 'pointer-events-none opacity-50' : ''
      }`}
      href={href}
    >
      {children}
    </Link>
  )
}

export default async function Header() {
  const session = await getServerSession(authOptions)

  if (session) {
    const { channels } = (await getUserData(session.user.id)) as User

    return (
      <header className='flex justify-between w-full'>
        <div className='flex space-x-4 items-center'>
          <Link className='w-28 pt-0.5' href='/'>
            <Image
              className='w-full h-full'
              src='/images/logo.svg'
              alt='로레디 로고'
              width={100}
              height={50}
              priority
            />
          </Link>
          <div className='shrink-0 h-full w-[1px] border-l hidden sm:flex'></div>

          <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string}>사용법</HeaderLink>
          <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
          {<HeaderLink href={`/${channels[0]}/dashboard`}>대시보드</HeaderLink>}
        </div>
        <div className='flex items-center gap-4'>
          <ThemeButton />
          <AuthButton />
        </div>
      </header>
    )
  }

  return (
    <header className='flex justify-between w-full'>
      <div className='flex space-x-4 items-center'>
        <Link className='w-28 pt-0.5' href='/'>
          <Image className='w-full h-full' src='/images/logo.svg' alt='로레디 로고' width={100} height={50} priority />
        </Link>
        <div className='shrink-0 h-full w-[1px] border-l hidden sm:flex'></div>

        <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string}>사용법</HeaderLink>
        <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeButton />
        <AuthButton />
      </div>
    </header>
  )
}
