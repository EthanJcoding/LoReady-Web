'use client'

import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import SearchSiblings from './SearchSiblings'

export default function Search() {
  return (
    <main className='max-w-[121rem] flex-1 flex flex-col gap-8 sm:flex-row overflow-hidden'>
      <section className='min-w-[18rem] flex flex-col space-y-4'>
        <SearchInput />
        <SearchSiblings />
      </section>
      <section className='flex flex-col border sm:w-4/5 max-w-[64rem] p-8 rounded-lg shadow-sm gap-4 overflow-y-auto '>
        <SearchResult />
      </section>
    </main>
  )
}
