import { getScheduleData } from '@/api/firebase'
import CompactRaidCard from './CompactRaidCard'
import Link from 'next/link'

interface Ownprops {
  scheduleId: string
}

export default async function RaidList({ scheduleId }: Ownprops) {
  const data = await getScheduleData(scheduleId)

  if (!data) return
  return (
    <li>
      <Link href={`/${data.channel}/schedule/${scheduleId}`}>
        <CompactRaidCard
          boss={data.raidName}
          leader={data.raidLeader.character}
          date={data.raidDate}
          headCount={data.raidType}
        />
      </Link>
    </li>
  )
}
