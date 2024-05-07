'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { FaArrowUp, FaArrowDown, FaRegCaretSquareDown, FaRegCaretSquareUp } from 'react-icons/fa'
import { savePartyData } from '@/api/firebase/savePartyData/savePartyData'

interface Ownprops {
  parties: { [key: string]: Character[] }
  setSelectedCharacter: (character: Character) => void
  raidType: string
}

interface Character {
  userId: string
  character: string
}

export default function TeamAllocator({ parties, setSelectedCharacter, raidType }: Ownprops) {
  const [party1, setParty1] = useState(parties.party1)
  const [party2, setParty2] = useState(parties.party2)

  const params = useParams<{ channelId: string; scheduleId: string }>()
  const { scheduleId } = params

  const moveMemberUp = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0 && memberIndex > 0) {
      const newParty1 = [...party1]
      ;[newParty1[memberIndex - 1], newParty1[memberIndex]] = [newParty1[memberIndex], newParty1[memberIndex - 1]]
      setParty1(newParty1)
    } else if (partyIndex === 1 && party1.length === 0) {
      const newParty2 = [...party2]
      const movedMember = newParty2.shift()!
      setParty2(newParty2)
      setParty1([movedMember])
    } else if (partyIndex === 1 && memberIndex > 0) {
      const newParty2 = [...party2]
      ;[newParty2[memberIndex - 1], newParty2[memberIndex]] = [newParty2[memberIndex], newParty2[memberIndex - 1]]
      setParty2(newParty2)
    } else if (partyIndex === 1 && memberIndex === 0 && party1.length > 0) {
      const newParty1 = [...party1]
      const newParty2 = [...party2]
      const movedMember = newParty2.shift()!
      setParty2(newParty2)
      setParty1([...newParty1, movedMember])
    }
  }

  const moveMemberDown = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0 && memberIndex < party1.length - 1) {
      const newParty1 = [...party1]
      ;[newParty1[memberIndex], newParty1[memberIndex + 1]] = [newParty1[memberIndex + 1], newParty1[memberIndex]]
      setParty1(newParty1)
    } else if (partyIndex === 1 && memberIndex < party2.length - 1) {
      const newParty2 = [...party2]
      ;[newParty2[memberIndex], newParty2[memberIndex + 1]] = [newParty2[memberIndex + 1], newParty2[memberIndex]]
      setParty2(newParty2)
    } else if (partyIndex === 0 && memberIndex === party1.length - 1 && party1.length > 0) {
      const newParty1 = [...party1]
      const movedMember = newParty1.pop()!
      setParty1(newParty1)
      setParty2([movedMember, ...party2])
    }
  }

  const moveMember = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0) {
      const newParty1 = party1.filter(el => el !== party1[memberIndex])
      const newParty2 = [...party2, party1[memberIndex]]

      setParty1(newParty1)
      setParty2(newParty2)
    }

    if (partyIndex === 1) {
      const newParty2 = party2.filter(el => el !== party2[memberIndex])
      const newParty1 = [...party1, party2[memberIndex]]

      setParty1(newParty1)
      setParty2(newParty2)
    }
  }

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character)
  }

  const handleSave = () => {
    if (party1.length < 5 && party2.length < 5) {
      const dataFilteredParty1 = party1.map(el => ({ userId: el.userId, character: el.character }))
      const dataFilteredParty2 = party2.map(el => ({ userId: el.userId, character: el.character }))

      savePartyData(scheduleId, dataFilteredParty1, dataFilteredParty2)

      window.alert('저장완료')
    } else {
      window.alert('한 파티에는 4명까지 참여 가능합니다')
    }
  }

  if (raidType === '4인레이드') {
    return (
      <section className='flex flex-col border sm:w-1/3 w-full sm:h-full p-8 rounded-lg shadow-sm space-y-4'>
        <div className='w-full h-full space-y-2'>
          <div className='text-xl font-semibold'>공대원 리스트</div>
          {party1.map((member, idx) => {
            return (
              <div key={idx} className='flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'>
                <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full'>
                  <div>{idx + 1}.</div>
                  <div className='truncate'>{member.character}</div>
                </button>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  if (raidType === '8인레이드') {
    return (
      <section className='flex flex-col border sm:w-1/3 w-full sm:h-full p-8 rounded-lg shadow-sm space-y-4 overflow-scroll'>
        <div className='w-full h-full space-y-2'>
          <div className='text-xl font-semibold'>1번 공대</div>
          {party1.map((member, idx) => {
            return (
              <div key={idx} className='flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'>
                <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full '>
                  <div>{idx + 1}.</div>
                  <div className=''>{member.character}</div>
                </button>
                <div className='flex space-x-2'>
                  <button onClick={() => moveMember(0, idx)}>
                    <FaRegCaretSquareDown />
                  </button>
                  <button onClick={() => moveMemberDown(0, idx)}>
                    <FaArrowDown />
                  </button>
                  <button onClick={() => moveMemberUp(0, idx)}>
                    <FaArrowUp />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-full h-full space-y-2'>
          <div className='text-xl font-semibold'>2번 공대</div>
          {party2.map((member, idx) => {
            return (
              <div key={idx} className='flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'>
                <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full'>
                  <div>{idx + 1}.</div>
                  <div className='truncate'>{member.character}</div>
                </button>
                <div className='flex space-x-2'>
                  <button onClick={() => moveMember(1, idx)}>
                    <FaRegCaretSquareUp />
                  </button>
                  <button onClick={() => moveMemberDown(1, idx)}>
                    <FaArrowDown />
                  </button>
                  <button onClick={() => moveMemberUp(1, idx)}>
                    <FaArrowUp />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className='flex w-full h-full space-x-4 items-end justify-end'>
          <button
            onClick={() => handleSave()}
            className='h-10 px-4 py-2 transition rounded border bg-transparent hover:bg-secondary-gray/50 text-sm font-semibold'
          >
            저장하기
          </button>
        </div>
      </section>
    )
  }
}
