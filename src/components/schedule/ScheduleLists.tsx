'use client'

import { useEffect, useRef, useState } from 'react'
import ScheduleList from './ScheduleList'
import { getChannelSchedule } from '@/api/firebase'
import { ScheduleWithId } from '@/types/schedule'
import { DocumentData } from 'firebase/firestore'
import { useToggleStore } from '@/stores/toggle'
import { useSession } from 'next-auth/react'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([])
  const [lastSnapshot, setLastSnapshot] = useState<DocumentData>()
  const [isMore, setIsMore] = useState(true)
  const [isFiltered, setIsFiltered] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const isActive = useToggleStore(state => state.isActive)
  const session = useSession()
  const userId: string | undefined = session.data?.user?.id

  useEffect(() => {
    let observer: IntersectionObserver

    const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && isMore) {
        getChannelSchedule(channelId, lastSnapshot, isActive ? userId : undefined)
          .then(res => {
            setSchedules(prevSchedules => [...prevSchedules, ...res.data])
            setLastSnapshot(res.lastSnap)
            setIsMore(res.lastSnap !== undefined)
          })
          .catch(error => console.log(error))
      }
    }

    if (isFiltered !== isActive) {
      setIsFiltered(isActive)
      setSchedules([])
      setLastSnapshot(undefined)
      setIsMore(true)
    }

    if (targetRef.current && isMore) {
      observer = new IntersectionObserver(handleIntersect)

      observer.observe(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [lastSnapshot, isMore, isActive])

  return (
    <>
      {schedules.length ? (
        <ul className='grid grid-cols-4 gap-5 max-xl:grid-cols-3'>
          {schedules.map(schedule => (
            <ScheduleList key={schedule.id} schedule={schedule} />
          ))}
        </ul>
      ) : (
        <div className='py-10 text-center text-xl font-medium text-dark/60 dark:text-light/90'>
          예정된 레이드가 없습니다.
        </div>
      )}
      {isMore && <div ref={targetRef}></div>}
    </>
  )
}
