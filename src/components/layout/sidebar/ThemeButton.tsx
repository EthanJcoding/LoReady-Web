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
      className='p-1 border border-gray-200/50 rounded-md bg-transparent text-gray-400 hover:bg-gray-50 dark:text-white hover:dark:bg-gray-700'
      onClick={handleClick}
    >
      {currentTheme === 'dark' ? <MdOutlineDarkMode size='26' /> : <MdOutlineLightMode size='26' />}
    </button>
  )
}
