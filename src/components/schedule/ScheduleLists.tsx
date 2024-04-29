'use client'

import { useEffect, useState } from 'react'
import ScheduleList from './ScheduleList'
import { getChannelSchedule } from '@/api/firebase'
import { ScheduleWithId } from '@/types/schedule'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([])

  useEffect(() => {
    getChannelSchedule(channelId)
      .then(res => {
        setSchedules(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <ul className='grid grid-cols-4 gap-5 max-xl:grid-cols-3'>
      {schedules.map(schedule => (
        <ScheduleList key={schedule.id} schedule={schedule} />
      ))}
    </ul>
  )
}
