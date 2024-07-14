'use client'

import { useSiblingsStore } from '@/stores/siblingsStore'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function SearchSiblings() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { siblings, isLoading, error, searchSiblings } = useSiblingsStore()
  const characterName = searchParams.get('query')

  useEffect(() => {
    if (characterName) {
      searchSiblings(characterName.trim().replace(/\s+/g, ''))
    }
  }, [characterName])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <FaSpinner className='animate-spin text-7xl' color='#00a4e8' />
      </div>
    )
  }

  if (error) {
    return <div>오류가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}</div>
  }

  if (!siblings) {
    return <div>검색 결과가 없습니다.</div>
  }

  const handleClick = (characterName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('query', characterName)
    router.push(`?${newSearchParams.toString()}`, { scroll: false })
  }

  return (
    <div className='w-full h-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col'>
      <div className='flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-700'>
        <h3 className='text-base font-semibold text-gray-700 dark:text-gray-200'>
          <span className='text-lg font-bold'>{characterName}</span>님의 원정대원 리스트
        </h3>
      </div>
      <ul className='divide-y divide-gray-200 dark:divide-gray-600 overflow-y-auto h-[calc(100%-56px)]'>
        {siblings.map(character => (
          <li key={character.CharacterName}>
            <button
              onClick={() => handleClick(character.CharacterName)}
              className='w-full flex items-center justify-between py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition'
            >
              <div className='text-xs flex flex-col space-y-1 items-start'>
                <span className='truncate'>{character.CharacterClassName}</span>
                <span className='truncate'>{character.ItemAvgLevel}</span>
              </div>
              <span className='truncate text-sm'>{character.CharacterName}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
