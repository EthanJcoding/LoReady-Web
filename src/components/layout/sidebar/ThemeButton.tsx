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
      className='w-9 h-9 p-1 border border-secondary-gray/50 rounded-md bg-transparent text-primary-gray hover:bg-light dark:border-primary-gray/50 dark:text-light hover:dark:bg-dark'
      onClick={handleClick}
    >
      {currentTheme === 'dark' ? (
        <MdOutlineDarkMode className='w-full h-full' />
      ) : (
        <MdOutlineLightMode className='w-full h-full' />
      )}
    </button>
  )
}
