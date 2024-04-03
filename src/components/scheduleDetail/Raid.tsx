'use client'

import { Schedule } from '@/types/schedule'
import CharacterDetail from './CharacterDetail'
import TeamAllocator from './TeamAllocator'
import { Character } from '@/types/raid'

interface Ownprops {
  parties: { [key: string]: Character[] }
}

export default function Raid({ parties }: Ownprops) {
  console.log(parties)

  return (
    <>
      {/* <TeamAllocator /> */}
      <CharacterDetail />
    </>
  )
}
