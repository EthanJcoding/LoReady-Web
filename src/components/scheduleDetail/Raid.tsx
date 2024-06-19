'use client'

import { Session } from 'next-auth'
import CharacterDetail from './CharacterDetail'
import TeamAllocator from './TeamAllocator/TeamAllocator'
import { Character } from '@/types/raid'
import { useState } from 'react'

interface Ownprops {
  parties: { [key: string]: Character[] }
  raidType: string
  raidLeader: Character
  characters: Character[]
  raidName: string
  raidDate: string
  userData: Session | null
  scheduleId: string
}

export default function Raid({
  parties,
  raidType,
  raidLeader,
  characters,
  raidName,
  raidDate,
  userData,
  scheduleId
}: Ownprops) {
  const defaultCharacter = parties.party1.length === 0 ? parties.party2[0] : parties.party1[0]
  const [selectedCharacter, setSelectedCharacter] = useState(defaultCharacter)

  return (
    <>
      <TeamAllocator
        parties={parties}
        setSelectedCharacter={setSelectedCharacter}
        selectedCharacter={selectedCharacter}
        raidType={raidType}
        raidLeader={raidLeader}
        characters={characters}
        raidName={raidName}
        raidDate={raidDate}
        userData={userData}
        scheduleId={scheduleId}
      />
      <CharacterDetail selectedCharacter={selectedCharacter} />
    </>
  )
}
