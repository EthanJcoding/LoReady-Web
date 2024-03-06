import ThemeButton from './ThemeButton'
import { MdEmail } from 'react-icons/md'

export default function SideBar() {
  return (
    <aside className='min-w-72 flex flex-col bg-white border-r border-secondary-gray/50 dark:bg-neutral-900 dark:border-primary-gray/50'>
      <header className='flex items-center p-7'>
        <div className='flex-1'>
          <a className='text-2xl text-blue-700' href='/'>
            LoReady
          </a>
        </div>
        <div className='flex items-center'>
          <ThemeButton />
        </div>
      </header>
      <div className='flex-1 flex flex-col justify-center p-7'>참여중인 서버</div>
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
