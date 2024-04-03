'use client'
import { getUserData } from '@/api/firebase'
import React, { useState } from 'react'

interface OwnProps {
  characters: {
    party0: Character[]
    party1: Character[]
    party2: Character[]
    [key: string]: Character[]
  }
}

interface Character {
  userId: string
  character: string
}

export default function TeamAllocator({ characters }: OwnProps) {
  const [parties, setParties] = useState(characters)

  const moveMember = (character: Character, targetParty: string) => {
    const updatedParties = {
      ...parties,
      [targetParty]: [...parties[targetParty], character],
      [targetParty === 'party1' ? 'party2' : 'party1']: parties[targetParty === 'party1' ? 'party2' : 'party1'].filter(
        member => member.character !== character.character
      ),
      party0: parties.party0.filter(member => member.character !== character.character)
    }

    setParties(updatedParties)
  }

  const resetParties = () => {
    setParties(characters)
  }

  const getUserInfo = async (userId: string) => {
    const data = await getUserData(userId)
    console.log(data)
  }

  const saveParties = () => {}

  return (
    <section className='w-full h-full p-4 rounded-lg flex flex-col space-y-2'>
      <div className='w-full flex justify-end space-x-4'>
        <button onClick={resetParties}>초기화</button>
        <button onClick={saveParties}>저장하기</button>
      </div>
      <div className='w-full flex justify-between h-full space-x-2'>
        {['party1', 'party2'].map(partyKey => (
          <div className='border w-full p-4 rounded' key={partyKey}>
            {parties[partyKey].map(character => (
              <div className='flex justify-between w-full' key={character.character}>
                <div>{character.character}</div>
                <div className='space-x-4'>
                  <button onClick={() => moveMember(character, partyKey === 'party1' ? 'party2' : 'party1')}>
                    {partyKey === 'party1' ? '2파티로' : '1파티로'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='border w-full p-4 space-y-4 h-full rounded'>
        {parties.party0.map(character => {
          getUserInfo(character.userId)

          return (
            <div className='flex justify-between w-full' key={character.character}>
              <div>{character.character}</div>
              <div className='space-x-4'>
                <button onClick={() => moveMember(character, 'party1')}>1파티로</button>
                <button onClick={() => moveMember(character, 'party2')}>2파티로</button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
