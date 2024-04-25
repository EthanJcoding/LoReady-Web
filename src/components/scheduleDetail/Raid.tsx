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
  const [selectedCharacter, setSelectedCharacter] = useState(parties.party1[0])

  return (
    <div className='flex-1 flex gap-4 h-1/2'>
      <TeamAllocator parties={parties} setSelectedCharacter={setSelectedCharacter} raidType={raidType} />
      <CharacterDetail selectedCharacter={selectedCharacter} />
    </div>
  )
}
