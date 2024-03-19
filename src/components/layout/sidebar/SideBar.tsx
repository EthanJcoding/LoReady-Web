import ServerLists from './ServerLists'
import ThemeButton from './ThemeButton'
import { MdEmail } from 'react-icons/md'
import { BsHash } from 'react-icons/bs'
import AuthButton from './auth/AuthButton'

export default function SideBar() {
  return (
    <aside className='w-72 flex flex-col bg-white border-r border-secondary-gray/50 dark:bg-neutral-900 dark:border-primary-gray/50'>
      <header className='flex items-center p-7'>
        <div className='flex w-full justify-between'>
          <a className='text-2xl text-blue-700' href='/'>
            LoReady
          </a>
          <div className='flex items-center'>
            <ThemeButton />
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
