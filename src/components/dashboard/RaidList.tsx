import CompactRaidCard from './CompactRaidCard'
import Link from 'next/link'
import { extractBossRank } from '@/utils/extractBossRank'
import { extractCapacity } from '@/utils/extractCapacity'

interface Ownprops {
  scheduleId: string
  channelId: string
  raidName: string
  raidType: string
  raidLeader: string
  raidDate: string
  participants: string[]
}

export default function RaidList({
  scheduleId,
  channelId,
  raidName,
  raidType,
  raidLeader,
  raidDate,
  participants
}: Ownprops) {
  const { boss, rank } = extractBossRank(raidName)
  const capacity = extractCapacity(raidType)
  const participant = participants.length

  return (
    <li>
      <Link href={`/${channelId}/schedule/${scheduleId}`}>
        <CompactRaidCard
          boss={boss}
          rank={rank}
          leader={raidLeader}
          date={raidDate}
          headCount={`${participant} / ${capacity}`}
        />
      </Link>
    </li>
  )
}
