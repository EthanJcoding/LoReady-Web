'use client'
import { useEffect, useState } from 'react'
import { getScheduleData } from '@/api/firebase/getScheduleData/getScheduleData'
import Link from 'next/link'
import { extractBossRank } from '@/utils/extractBossRank'
import { extractCapacity } from '@/utils/extractCapacity'
import CompactRaidCard from '../dashboard/CompactRaidCard'
import { useRaidClearFilterStore } from '@/stores/raidClearFilter'

interface Ownprops {
  scheduleId: string
}

interface PartyMember {
  character: string
  userId: string
}

interface ScheduleData {
  character: string
  characters: {
    party0: PartyMember[]
    party1: PartyMember[]
    party2: PartyMember[]
  }
  raidDate: string
  raidLeader: {
    character: string
  }
  raidName: string
  channel: string
  raidType: string
  participants: string
}

export default function PartyListDetail({ scheduleId }: Ownprops) {
  const { filter } = useRaidClearFilterStore()
  const [data, setData] = useState<ScheduleData | null>(null)
  const [isExpired, setIsExpired] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getScheduleData(scheduleId)
      if (result) {
        const raidData: ScheduleData = {
          character: result.character,
          characters: result.characters,
          raidDate: result.raidDate,
          raidLeader: result.raidLeader,
          raidName: result.raidName,
          channel: result.channel,
          raidType: '',
          participants: ''
        }
        setData(raidData)
        const raidDateTime = new Date(raidData.raidDate)
        setIsExpired(raidDateTime <= new Date())
      }
    }
    fetchData()
  }, [scheduleId])

  if (!data || (filter === 'clearParty' && isExpired)) return null

  const { boss, rank } = extractBossRank(data.raidName)
  const capacity = extractCapacity(data.raidType)
  const participants = data.participants.length
  console.log('filter :', filter)

  return (
    <li className='relative border-solid border-2 rounded-md md:w-[350px] p-1 m-1'>
      <Link href={`/${data.channel}/schedule/${scheduleId}`} className='pointer-events-auto'>
        <CompactRaidCard
          boss={boss}
          rank={rank}
          leader={data.raidLeader.character}
          date={data.raidDate}
          headCount={`${participants} / ${capacity}`}
        />
        {isExpired && <div className='absolute inset-0 bg-black opacity-50 rounded-md'></div>}
        <div className='grid grid-cols-2 gap-4 pt-2 px-3 text-center'>
          <div>
            <div className='bg-lime-400 rounded-md font-bold text-white '>1번파티</div>
            <ul className='gap-1'>
              {data.characters.party1?.map((party: PartyMember, index: number) => (
                <li className='bg-slate-300 mt-1 rounded-md' key={index}>
                  {party.character}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='bg-violet-600 rounded-md font-bold text-white'>2번파티</div>
            <ul className='gap-1'>
              {data.characters.party2?.map((party: PartyMember, index: number) => (
                <li className='bg-slate-300 mt-1 rounded-md' key={index}>
                  {party.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
      {isExpired && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-6xl pointer-events-none'>
          완료
        </div>
      )}
    </li>
  )
}
