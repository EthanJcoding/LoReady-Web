'use client'

import { useSearchStore } from '@/stores/searchStore'
import CharacterSummary from '../scheduleDetail/CharacterDetail/CharacterSummary'
import ArmoryTab from '../scheduleDetail/CharacterDetail/ArmoryTab'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function SearchResult() {
  const { character, error, isLoading, searchCharacter, resetSearchResult } = useSearchStore()
  const searchParams = useSearchParams()
  const characterName = searchParams.get('query')

  useEffect(() => {
    if (characterName) {
      searchCharacter(characterName.trim().replace(/\s+/g, ''))
    }

    return () => {
      resetSearchResult()
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

  if (!character) {
    return <div>검색 결과가 없습니다.</div>
  }

  return (
    <>
      <CharacterSummary
        ArmoryCard={character.ArmoryCard}
        ArmoryEngraving={character.ArmoryEngraving}
        ArmoryEquipment={character.ArmoryEquipment}
        ArmoryGem={character.ArmoryGem}
        ArmoryProfile={character.ArmoryProfile}
      />
      <ArmoryTab
        ArmoryEquipment={character.ArmoryEquipment}
        ArmoryCard={character.ArmoryCard}
        ArmoryGem={character.ArmoryGem}
        ArmoryEngraving={character.ArmoryEngraving}
      />
    </>
  )
}
