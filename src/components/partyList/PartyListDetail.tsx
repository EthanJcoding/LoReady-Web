import { getScheduleData } from '@/api/firebase/getScheduleData/getScheduleData'
import Link from 'next/link'

import { extractBossRank } from '@/utils/extractBossRank'
import { extractCapacity } from '@/utils/extractCapacity'
import CompactRaidCard from '../dashboard/CompactRaidCard'

interface Ownprops {
  scheduleId: string
}

interface ScheduleData {
  character: string
  characters: {
    party0: { name: string }[]
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

export default async function PartyListDetail({ scheduleId }: Ownprops) {
  scheduleId = '57FNJZW3G0hI2hXcVK1v'

  const data = await getScheduleData(scheduleId)

  if (!data) return
  const { boss, rank } = extractBossRank(data.raidName)
  const capacity = extractCapacity(data.raidType)
  const participants = data.participants.length

  return (
    <li>
      <Link href={`/${data.channel}/schedule/${scheduleId}`}>
        <CompactRaidCard
          boss={boss}
          rank={rank}
          leader={data.raidLeader.character}
          date={data.raidDate}
          headCount={`${participants} / ${capacity}`}
        />
        <div className='grid grid-cols-2 gap-4 pt-2 px-3 text-center'>
          <div>
            <div className='bg-lime-400 rounded-md font-bold text-white '>1번파티</div>
            <ul className='gap-1'>
              {data.characters.party0.map((party: ScheduleData, index: number) => (
                <li className='bg-slate-300 mt-1 rounded-md' key={index}>
                  {party.character}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='bg-violet-600 rounded-md font-bold text-white'>2번파티</div>
            <ul className='gap-1'>
              {data.characters.party0.map((party: ScheduleData, index: number) => (
                <li className='bg-slate-300 mt-1 rounded-md' key={index}>
                  {party.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </li>
  )
}
