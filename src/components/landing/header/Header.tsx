'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from '@/components/layout/sidebar/ThemeButton'
import AuthButton from '@/components/auth/AuthButton'
import Gnb from './Gnb'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Session } from 'next-auth'
import GnbMobile from './GnbMobile'
import Contact from './Contact'

interface Ownprops {
  session: Session
}

export default function Header({ session }: Ownprops) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='flex justify-between w-full relative'>
      <nav className='flex space-x-4 items-center '>
        <Link className='w-28 pt-0.5' href='/'>
          <Image className='w-full h-full' src='/images/logo.svg' alt='로레디 로고' width={100} height={50} priority />
        </Link>
        <div className='shrink-0 h-full w-[1px] border-l dark:border-primary-gray/50 flex '></div>
        <div className='hidden sm:block'>
          <Gnb session={session} />
        </div>
      </nav>

      <div className='hidden items-center gap-4 max-sm:gap-3 sm:flex'>
        <ThemeButton />
        <AuthButton />
      </div>

      <button className='sm:hidden flex justify-center items-center' onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes className='text-2xl rounded transition hover:rotate-90 text-dark dark:text-light' />
        ) : (
          <FaBars className='text-2xl rounded transition hover:rotate-90 text-dark dark:text-light' />
        )}
      </button>

      {isMenuOpen && (
        <div className='absolute top-full right-0 shadow-md z-50 bg-white dark:bg-light/5 sm:hidden rounded-lg'>
          <div className='flex flex-col p-4 space-y-4'>
            <AuthButton />
            <GnbMobile session={session} />
            <div className='flex gap-4 items-center'>
              <ThemeButton />
              <Contact />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
