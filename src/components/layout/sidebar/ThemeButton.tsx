'use client'
import { useTheme } from 'next-themes'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

export default function ThemeButton() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const handleClick = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      className='flex-none flex justify-center items-center w-10 h-10 border border-secondary-gray/50 rounded-md bg-transparent text-primary-gray hover:bg-secondary-gray/20 dark:border-primary-gray/50 dark:text-light transition-colors'
      onClick={handleClick}
    >
      {currentTheme === 'dark' ? <MdOutlineDarkMode className='w-7 h-7' /> : <MdOutlineLightMode className='w-7 h-7' />}
    </button>
  )
}
