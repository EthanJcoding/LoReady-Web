import { Schedule } from '@/types/schedule'
import CompactRaidCard from '../dashboard/CompactRaidCard'
import TeamLists from './TeamLists'
import { extractBossRank } from '@/utils/extractBossRank'
import { extractCapacity } from '@/utils/extractCapacity'

interface Ownprops {
  schedule: Schedule
}

export default function ScheduleList({ schedule }: Ownprops) {
  const { boss, rank } = extractBossRank(schedule.raidName)
  const capacity = extractCapacity(schedule.raidType)
  const participant = schedule.participants.length

  console.log(schedule)

  return (
    <li className='h-80 flex flex-col bg-white shadow-md shadow-primary-gray/5 border border-secondary-gray/50 rounded-md overflow-hidden'>
      <CompactRaidCard
        boss={boss}
        rank={rank}
        leader={schedule.raidLeader.character}
        date={schedule.raidDate}
        headCount={`${participant} / ${capacity}`}
      />
      <div className='h-full grid grid-cols-2 border-t border-inherit text-dark'>
        <div className='flex flex-col border-r border-inherit bg-pink-50'>
          <span className='px-2 py-1 text-center font-semibold bg-pink-100'>Team 1</span>
          <TeamLists members={schedule.parties.party1} />
        </div>
        <div className='flex flex-col bg-blue-50'>
          <span className='px-2 py-1 text-center font-semibold bg-blue-100'>Team 2</span>
          <TeamLists members={schedule.parties.party2} />
        </div>
      </div>
    </li>
  )
}
