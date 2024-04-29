'use client'

import ScheduleList from './ScheduleList'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  //TODO: 무한스크롤
  return (
    <ul className='grid grid-cols-4 gap-5 max-xl:grid-cols-3'>
      <ScheduleList />
      <ScheduleList />
      <ScheduleList />
      <ScheduleList />
      <ScheduleList />
    </ul>
  )
}
