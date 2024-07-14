'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import RecentSearches from './RecentSearches'

export default function SearchInput() {
  const [input, setInput] = useState<string>('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 최근 검색어 불러오기
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const saveRecentSearches = (searches: string[]) => {
    localStorage.setItem('recentSearches', JSON.stringify(searches))
    setRecentSearches(searches)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (input.trim()) {
      // 최근 검색어 업데이트
      let updatedSearches = [input.trim(), ...recentSearches.filter(s => s !== input.trim())]

      // 최근 검색어를 5개로 제한
      if (updatedSearches.length > 5) {
        updatedSearches = updatedSearches.slice(0, 5)
      }

      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('query', input.trim())
      router.push(`?${newSearchParams.toString()}`, { scroll: false })

      saveRecentSearches(updatedSearches)
    }
  }

  const handleClearAll = () => {
    localStorage.removeItem('recentSearches')
    setRecentSearches([])
  }

  const handleRemoveSearch = (searchToRemove: string) => {
    const updatedSearches = recentSearches.filter(search => search !== searchToRemove)
    saveRecentSearches(updatedSearches)
  }

  const handleSearchClick = (search: string) => {
    setInput(search)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('query', search)
    router.push(`?${newSearchParams.toString()}`, { scroll: false })
  }

  return (
    <div className='flex flex-col items-center w-full space-y-4 h-min'>
      <form
        onSubmit={handleSubmit}
        className='flex h-10 w-full lg:w-[16rem] rounded-md border border-input bg-white dark:bg-dark px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 ring-offset-background items-center shadow-md'
      >
        <input
          className='w-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent'
          placeholder='유저 검색'
          onChange={e => setInput(e.target.value)}
          value={input}
          type='text'
          maxLength={12}
        />
        <button type='submit' aria-label='Search'>
          <FaSearch className='text-primary-gray' />
        </button>
      </form>

      <RecentSearches
        searches={recentSearches}
        onClearAll={handleClearAll}
        onRemove={handleRemoveSearch}
        onSearch={handleSearchClick}
      />
    </div>
  )
}
