'use client'

import { useEffect, useRef, useState } from 'react'
import RaidList from './RaidList'
import { getChannelSchedule } from '@/api/firebase/getChannelSchedule/getChannelSchedule'
import { DocumentData } from 'firebase/firestore'
import { ScheduleWithId } from '@/types/channelSchedule'

interface Ownprops {
  channelId: string
}

export default function UpcomingRaid({ channelId }: Ownprops) {
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
        root: rootRef.current,
        threshold: 1
      })

      observer.observe(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [lastSnapshot])

  return (
    <div className='card flex flex-col min-w-[340px] basis-1/3 p-0 overflow-hidden' ref={rootRef}>
      <div className='relative flex flex-col h-full bg-[#fee2e5] dark:bg-[#0080b7] overflow-y-auto'>
        <div className='flex justify-between p-5 pb-4 text-xl font-medium bg-inherit sticky top-0 left-0 z-20'>
          다가오는 레이드
        </div>
        <ul className='flex flex-col gap-3 px-5 pb-5'>
          {schedules.map(schedule => (
            <RaidList
              key={schedule.id}
              scheduleId={schedule.id}
              channelId={schedule.channel}
              raidName={schedule.raidName}
              raidType={schedule.raidType}
              raidLeader={schedule.raidLeader.character}
              raidDate={schedule.raidDate}
              participants={schedule.participants}
            />
          ))}
        </ul>
        {isMore && (
          <div className='pb-3 flex justify-center' ref={targetRef}>
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
