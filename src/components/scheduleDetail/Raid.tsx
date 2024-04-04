'use client'

import { Schedule } from '@/types/schedule'
import CharacterDetail from './CharacterDetail'
import TeamAllocator from './TeamAllocator'
import { Character } from '@/types/raid'
import { useState } from 'react'

interface Ownprops {
  parties: { [key: string]: Character[] }
}

export default function Raid({ parties }: Ownprops) {
  const [partiesState, setPartiesState] = useState(parties)

  return (
    <div className='flex-1 flex gap-4'>
      <TeamAllocator parties={partiesState} />
      <CharacterDetail />
    </div>
  )
}
