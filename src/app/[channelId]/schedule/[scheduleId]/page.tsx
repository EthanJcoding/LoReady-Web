import RaiderInfo from '@/components/scheduleDetail/RaiderInfo'
import Raiders from '@/components/scheduleDetail/Raiders'
import { RaidType } from '@/types/raid'

export interface MOCK_SCHEDULE_DATA_TYPE {
  title: string
  createdAt: string
  startTime: string
  members: MOCK_MEMBER_DATA_TYPE[]
  raidType: RaidType
}

export interface MOCK_MEMBER_DATA_TYPE {
  discordId: string
  character: string
  class: string
  itemLevel: string
}

const MOCK_SCHEDULE_DATA: MOCK_SCHEDULE_DATA_TYPE = {
  title: '일하 트라이',
  createdAt: '2024-03-02',
  startTime: '2024-03-03 14:50',
  raidType: '8인레이드',
  members: [
    { discordId: '정준일', character: 'v최강준일aasv', class: '리퍼', itemLevel: '1601' },
    { discordId: '김명환', character: 'v최강명환zxczxv', class: '바드', itemLevel: '1602' },
    { discordId: '정규식', character: '흑우가우는소리음머', class: '기공사', itemLevel: '1620.88' },
    { discordId: '이승민', character: '승민', class: '워로드', itemLevel: '1604' },
    { discordId: '박도훈', character: '강도훈', class: '도화가', itemLevel: '1605' },
    { discordId: '김순채', character: '최강순채', class: '배틀마스터', itemLevel: '1606' },
    { discordId: '송덕용', character: 'vss최강덕용v', class: '소울이터', itemLevel: '1607' },
    { discordId: '정한슬', character: 'v최d강한슬v', class: '데빌헌터', itemLevel: '1608' }
  ]
}

export default function ScheduleDetail() {
  const raiders = MOCK_SCHEDULE_DATA.members
  const raidType = MOCK_SCHEDULE_DATA.raidType

  return (
    <div className='flex-1 flex gap-5'>
      <Raiders raidersData={raiders} raidType={raidType} />
      <RaiderInfo />
    </div>
  )
}
