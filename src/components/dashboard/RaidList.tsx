import { getScheduleData } from '@/api/firebase'
import CompactRaidCard from './CompactRaidCard'
import Link from 'next/link'
import { extractBossRank, extractCapacity } from '@/utils/util'

interface Ownprops {
  scheduleId: string
}

export default async function RaidList({ scheduleId }: Ownprops) {
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
      </Link>
    </li>
  )
}
