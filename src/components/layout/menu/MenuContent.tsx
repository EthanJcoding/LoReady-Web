import ThemeButton from '../sidebar/ThemeButton'
import ServerLists from '../sidebar/ServerLists'
import { MdEmail } from 'react-icons/md'
import { BsHash } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'

export default function MenuContent() {
  return (
    <aside className='z-40 fixed top-0 2xl:left-0 h-screen w-72 bg-white border-r border-secondary-gray/50 shadow-2xl peer-focus:left-0 -left-96 peer:transition ease-out delay-150 duration-200 flex flex-col dark:bg-neutral-900 dark:border-primary-gray/50'>
      <header className='flex items-center p-7'>
        <div className='flex flex-col w-full space-y-8'>
          <div className='flex w-full justify-between'>
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
            <div className='flex items-center'>
              <ThemeButton />
            </div>
          </div>
        </div>
      </header>
      <div className='flex-1 flex flex-col justify-center px-7 py-14 overflow-hidden'>
        <div className='flex items-center text-sm pb-3'>
          <span>
            <BsHash size={18} />
          </span>
          참여중인 서버
        </div>
        <div className='flex-1 overflow-y-auto'>
          <ServerLists />
        </div>
      </div>
      <footer className='flex flex-col gap-5 px-7 py-5 border-t border-inherit'>
        <ul className='flex gap-5 text-base text-inherit'>
          <li className='flex items-center gap-1'>
            <span>
              <MdEmail size='20' />
            </span>
            Contact us
          </li>
        </ul>
        <div className='text-xs text-primary-gray'>&copy; 2024. LoReady. All rights reserved.</div>
      </footer>
    </aside>
  )
}
