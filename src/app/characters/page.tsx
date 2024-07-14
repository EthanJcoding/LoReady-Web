import Header from '@/components/landing/header/Header'
import Search from '@/components/search/Search'

export default function Characters() {
  return (
    <div className='w-full p-7 space-y-4 h-dvh flex flex-col bg-light dark:bg-dark dark:text-light max-sm:p-5'>
      <Header />
      <Search />
    </div>
  )
}
