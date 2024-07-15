import React, { useState } from 'react'
import { FaTimes, FaTrash, FaSearch, FaCaretUp } from 'react-icons/fa'

interface RecentSearchesProps {
  searches: string[]
  onClearAll: () => void
  onRemove: (search: string) => void
  onSearch: (search: string) => void
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onClearAll, onRemove, onSearch }) => {
  const [fold, setFold] = useState<boolean>(false)

  const handleFold = () => {
    setFold(!fold)
  }

  if (searches.length === 0) {
    return (
      <div className='w-full bg-white dark:bg-light/5 rounded-lg shadow-md overflow-hidden flex flex-col'>
        <div className='flex justify-between items-center py-2 px-4 bg-primary-blue dark:bg-gray-700'>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200'>최근 검색어</h3>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-white dark:bg-light/5 rounded-lg shadow-md overflow-hidden flex flex-col'>
      <div className='flex justify-between items-center py-2 px-4 bg-primary-blue dark:bg-gray-700'>
        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200'>최근 검색어</h3>
        <div className='flex gap-2'>
          <button
            onClick={onClearAll}
            className='text-sm text-red-500 hover:text-red-700 transition-colors flex items-center bg-white dark:bg-gray-600 px-3 py-1 rounded-full shadow-sm'
          >
            <FaTrash className='mr-2' />
            전체 삭제
          </button>
          <button className='hover:rotate-180 transition' onClick={handleFold}>
            <FaCaretUp size={20} />
          </button>
        </div>
      </div>
      {fold ? null : (
        <ul className='divide-y divide-gray-200 dark:divide-gray-600'>
          {searches.map(search => (
            <li
              key={search}
              className='flex items-center justify-between hover:bg-secondary-gray/50 dark:hover:bg-gray-700 transition p-2'
            >
              <button
                onClick={() => onSearch(search)}
                className='flex items-center flex-grow text-left text-gray-700 dark:text-gray-200'
              >
                <FaSearch className='mr-3 text-gray-400' />
                <span className='truncate text-sm'>{search}</span>
              </button>
              <button
                onClick={() => onRemove(search)}
                className=' text-gray-400 hover:text-red-500 transition-colors'
                aria-label='Remove search'
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentSearches
