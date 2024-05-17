import { ScheduleWithId } from '@/types/Schedule'
import CompactRaidCard from '../dashboard/CompactRaidCard'
import TeamLists from './TeamLists'
import { extractBossRank } from '@/utils/extractBossRank'
import { extractCapacity } from '@/utils/extractCapacity'
import Link from 'next/link'

interface Ownprops {
  schedule: ScheduleWithId
}

export default function ScheduleList({ schedule }: Ownprops) {
  const { boss, rank } = extractBossRank(schedule.raidName)
  const capacity = extractCapacity(schedule.raidType)
  const participant = schedule.participants.length

  return (
    <li className='h-80 shadow-md shadow-primary-gray/5 border border-secondary-gray/50 rounded-md overflow-hidden'>
      <Link href={`/${schedule.channel}/schedule/${schedule.id}`} className='h-full flex flex-col'>
        <CompactRaidCard
          boss={boss}
          rank={rank}
          leader={schedule.raidLeader.character}
          date={schedule.raidDate}
          headCount={`${participant} / ${capacity}`}
        />
        <div
          className={`h-full grid ${
            capacity === '4' ? 'grid-cols-1' : 'grid-cols-2'
          } border-t border-inherit text-dark`}
        >
          <div className={`flex flex-col border-inherit bg-blue-50 ${capacity === '4' ? 'border-none' : 'border-r'}`}>
            <span className='px-2 py-1 text-center font-semibold bg-blue-100'>
              {capacity === '4' ? 'Party' : '1 Party'}
            </span>
            <TeamLists members={schedule.parties.party1} />
          </div>
          {capacity === '8' && (
            <div className='flex flex-col bg-pink-50'>
              <span className='px-2 py-1 text-center font-semibold bg-pink-100'>2 Party</span>
              <TeamLists members={schedule.parties.party2} />
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}
