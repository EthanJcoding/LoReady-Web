const MOCK_SCHEDULE_DATA = {
  title: '일하 트라이',
  createdAt: '2024-03-02',
  startTime: '2024-03-03 14:50',
  members: [
    { discordId: '정준일', character: 'v최강준일v', class: '리퍼', itemLevel: '1601' },
    { discordId: '김명환', character: 'v최강명환v', class: '바드', itemLevel: '1602' },
    { discordId: '정규식', character: '흑우가우는소리음머', class: '기공사', itemLevel: '1620.88' },
    { discordId: '이승민', character: 'v최강승민v', class: '워로드', itemLevel: '1604' },
    { discordId: '박도훈', character: 'v최강도훈v', class: '도화가', itemLevel: '1605' },
    { discordId: '김순채', character: 'v최강순채v', class: '배틀마스터', itemLevel: '1606' },
    { discordId: '송덕용', character: 'v최강덕용v', class: '소울이터', itemLevel: '1607' },
    { discordId: '정한슬', character: 'v최강한슬v', class: '데빌헌터', itemLevel: '1608' }
  ]
}

export default function ScheduleDetail() {
  return <div className='flex-1 flex gap-5'>레이드 일정 상세</div>
}
