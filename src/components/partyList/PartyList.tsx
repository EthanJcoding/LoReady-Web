'use client'
import { getScheduleData } from '@/api/firebase/getScheduleData/getScheduleData'
import { useEffect, useState } from 'react'

interface ScheduleData {
  characters: {
    party0: {
      character: string
    }[]
    party1: { name: string }[]
    party2: { name: string }[]
  }
  raidDate: string
  raidLeader: {
    character: string
  }
  raidName: string
  channel: string
}

export default function PartyList() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null)
  useEffect(() => {
    getScheduleData('57FNJZW3G0hI2hXcVK1v')
      .then(data => {
        const scheduleData: ScheduleData = data as ScheduleData
        setScheduleData(scheduleData)
      })
      .catch(error => console.error(error))
  }, [])

  // 넘겨줘야할 데이터 : 각 파티 정보(디스코드 아이디, 캐릭터닉네임, 레벨, 클래스),title, createdAt, startTime, raidType

  return (
    <div className='grid grid-cols-2 gap-4 pt-2 px-3 text-center'>
      <div>
        <div className='bg-lime-400 rounded-md font-bold text-white '>1번파티</div>
        <ul className='gap-1'>
          {scheduleData?.characters.party0.map((party, index) => (
            <li className='bg-slate-300 mt-1 rounded-md' key={index}>
              {party.character}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className='bg-violet-600 rounded-md font-bold text-white'>2번파티</div>
        <ul className='gap-1'>
          {scheduleData?.characters.party0.map((party, index) => (
            <li className='bg-slate-300 mt-1 rounded-md' key={index}>
              {party.character}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
