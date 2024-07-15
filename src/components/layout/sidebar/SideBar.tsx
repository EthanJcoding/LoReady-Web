import ServerLists from './ServerLists'
import ThemeButton from './ThemeButton'
import { BsHash } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

export default function SideBar() {
  return (
    <aside className='w-72 2xl:flex 2xl:flex-col hidden bg-white border-r border-secondary-gray/50 dark:bg-neutral-900 dark:border-primary-gray/50'>
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
      <footer className='flex  gap-5 px-7 py-5 border-t border-inherit items-center space-x-1'>
        <div className='text-xs text-primary-gray'>
          This site is not associated with Smilegae RPG. &copy; 2024. LoReady. All rights reserved.
        </div>
        <a
          href={process.env.NEXT_PUBLIC_DISCORD_CHANNEL}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-full hover:scale-125 transition'
        >
          <FaDiscord color='white' size={20} />
        </a>
      </footer>
    </aside>
  )
}
