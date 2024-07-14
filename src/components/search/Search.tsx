'use client'

import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import SearchSiblings from './SearchSiblings'

export default function Search() {
  return (
    <main className='max-w-[121rem] flex-1 flex flex-col gap-4 sm:flex-row overflow-hidden'>
      <section className='flex flex-col px-4 space-y-4'>
        <SearchInput />
        <SearchSiblings />
      </section>
      <section className='flex flex-col border sm:w-4/5 w-full p-8 rounded-lg shadow-sm gap-4 overflow-y-auto'>
        <SearchResult />
      </section>
    </main>
  )
}
