'use client'

import { useEffect, useRef, useState } from 'react'
import ScheduleList from './ScheduleList'
import { getChannelSchedule } from '@/api/firebase'
import { ScheduleWithId } from '@/types/schedule'
import { DocumentData } from 'firebase/firestore'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([])
  const [lastSnapshot, setLastSnapshot] = useState<DocumentData>()
  const [isMore, setIsMore] = useState(true)
  const targetRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver

    const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && isMore) {
        getChannelSchedule(channelId, lastSnapshot)
          .then(res => {
            setSchedules(prevSchedules => [...prevSchedules, ...res.data])
            setLastSnapshot(res.lastSnap)
            setIsMore(res.lastSnap !== undefined)
          })
          .catch(error => console.log(error))
      }
    }

    if (targetRef.current && isMore) {
      observer = new IntersectionObserver(handleIntersect, {
        root: rootRef.current
      })

      observer.observe(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [lastSnapshot])

  return (
    <>
      <ul className='grid grid-cols-4 gap-5 max-xl:grid-cols-3'>
        {schedules.map(schedule => (
          <ScheduleList key={schedule.id} schedule={schedule} />
        ))}
      </ul>
      {isMore && <div ref={targetRef}></div>}
    </>
  )
}
