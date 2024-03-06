'use client'

import { MOCK_MEMBER_DATA_TYPE } from '@/app/[channelId]/schedule/[scheduleId]/page'
import UserInfoCard from './UserInfoCard'
import { getSchdules } from '@/api/firebase/schedules'

interface Ownprops {
  raiders: MOCK_MEMBER_DATA_TYPE[]
}

export default function Raiders({ raiders }: Ownprops) {
  const schedules = getSchdules('HjoJZv0cnKrECghRMgSa').then(data => console.log(data))

  return (
    <section className='flex flex-col basis-1/2 gap-5 bg-white rounded-md p-3 shadow-sm'>
      <section className='flex basis-1/2 gap-5 rounded-md border'>
        <div className='flex basis-1/2 rounded-md p-3 border'>
          <h6>1파티</h6>
          <ul></ul>
        </div>
        <div className='flex basis-1/2 rounded-md p-3 border'>
          <h6>2파티</h6>
          <ul></ul>
        </div>
      </section>
      <section className='flex flex-col basis-1/2 rounded-md p-3 border'>
        <h6>공대원을 배치해주세요</h6>
        <ul className='flex flex-wrap'>
          {raiders.map(raider => (
            <UserInfoCard
              key={raider.discordId}
              name={raider.discordId}
              character={raider.character}
              classType={raider.class}
              level={raider.itemLevel}
            />
          ))}
        </ul>
      </section>
    </section>
  )
}
