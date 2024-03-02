'use client'

import { MOCK_MEMBER_DATA_TYPE } from '@/app/[channelId]/schedule/[scheduleId]/page'

interface Ownprops {
  raiders: MOCK_MEMBER_DATA_TYPE[]
}

export default function Raiders({ raiders }: Ownprops) {
  return (
    <section className='flex flex-col basis-1/2 gap-5'>
      <section className='flex basis-1/2 gap-5'>
        <div className='flex basis-1/2'>
          <h6>1파티</h6>
          <ul></ul>
        </div>
        <div className='flex basis-1/2'>
          <h6>2파티</h6>
          <ul></ul>
        </div>
      </section>
      <section className='flex basis-1/2'>
        <h6>공대원을 배치해주세요</h6>
        <ul></ul>
      </section>
    </section>
  )
}
