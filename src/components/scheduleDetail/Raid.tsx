'use client'

import CharacterDetail from './CharacterDetail'
import TeamAllocator from './TeamAllocator'
import { Character } from '@/types/raid'
import { useState } from 'react'

interface Ownprops {
  parties: { [key: string]: Character[] }
  raidType: string
}

export default function Raid({ parties, raidType }: Ownprops) {
  const defaultCharacter = parties.party1.length === 0 ? parties.party2[0] : parties.party1[0]

  const [selectedCharacter, setSelectedCharacter] = useState(defaultCharacter)

  return (
    <div className='flex-1 flex flex-col gap-4 sm:flex-row overflow-scroll'>
      <TeamAllocator parties={parties} setSelectedCharacter={setSelectedCharacter} raidType={raidType} />
      <CharacterDetail selectedCharacter={selectedCharacter} />
    </div>
  )
}
