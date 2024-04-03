import { getScheduleData } from '@/api/firebase'
import RaiderInfo from '@/components/scheduleDetail/RaiderInfo'
import Raiders from '@/components/scheduleDetail/Raiders'
import TeamAllocator from '@/components/scheduleDetail/TeamAllocator'
import { RaidType } from '@/types/raid'

// export interface MOCK_SCHEDULE_DATA_TYPE {
//   title: string
//   createdAt: string
//   startTime: string
//   members: MOCK_MEMBER_DATA_TYPE[]
//   raidType: RaidType
// }

// export interface MOCK_MEMBER_DATA_TYPE {
//   discordId: string
//   character: string
//   class: string
//   itemLevel: string
// }

// const MOCK_SCHEDULE_DATA: MOCK_SCHEDULE_DATA_TYPE = {
//   title: '일하 트라이',
//   createdAt: '2024-03-02',
//   startTime: '2024-03-03 14:50',
//   raidType: '8인레이드',
//   members: [
//     { discordId: '정준일', character: 'v최강준일aasv', class: '리퍼', itemLevel: '1601' },
//     { discordId: '김명환', character: 'v최강명환zxczxv', class: '바드', itemLevel: '1602' },
//     { discordId: '정규식', character: '흑우가우는소리음머', class: '기공사', itemLevel: '1620.88' },
//     { discordId: '이승민', character: '승민', class: '워로드', itemLevel: '1604' },
//     { discordId: '박도훈', character: '강도훈', class: '도화가', itemLevel: '1605' },
//     { discordId: '김순채', character: '최강순채', class: '배틀마스터', itemLevel: '1606' },
//     { discordId: '송덕용', character: 'vss최강덕용v', class: '소울이터', itemLevel: '1607' },
//     { discordId: '정한슬', character: 'v최d강한슬v', class: '데빌헌터', itemLevel: '1608' }
//   ]
// }

interface Ownprops {
  params: {
    channelId: string
    scheduleId: string
  }
}

interface Raid {
  participants: string[]
  created: string
  updated: string
  characters: {
    party0: [{ userId: string; character: string }]
    party1: [{ userId: string; character: string }]
    party2: [{ userId: string; character: string }]
  }
  isActive: boolean
  raidName: string
  channel: string
  raidLeader: {
    character: string
    userId: string
  }
  raidType: string
  raidDate: string
  createdBy: string
}

export default async function ScheduleDetail({ params }: Ownprops) {
  const { channelId, scheduleId } = params

  const scheduleData = (await getScheduleData(scheduleId)) as Raid

  const { characters } = scheduleData

  return (
    <div className='flex-1 flex gap-4'>
      <TeamAllocator characters={characters} />
      <section className='border w-full h-full p-4 rounded-lg shadow-sm'>
        <div>1</div>
      </section>
    </div>
  )
}
