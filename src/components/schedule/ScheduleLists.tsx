'use client'

import { useEffect, useRef } from 'react'
import ScheduleList from './ScheduleList'
import { useScheduleFilterStore } from '@/stores/scheduleFilter'
import { useSession } from 'next-auth/react'
import { FaSpinner } from 'react-icons/fa'
import { useFetchSchedules } from '@/hooks/useFetchSchedules'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  const targetRef = useRef<HTMLDivElement>(null)
  const isShowMySchedule = useScheduleFilterStore(state => state.isShowMySchedule)
  const session = useSession()
  const userId: string | undefined = session.data?.user?.id
  const { schedules, isPending, isMore, fetchSchedules } = useFetchSchedules(channelId, userId, isShowMySchedule)

  // 초기 fetching
  useEffect(() => {
    fetchSchedules(true)
  }, [isShowMySchedule])

  // 추가 데이터 fetching
  useEffect(() => {
    let observer: IntersectionObserver

    const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && isMore) {
        fetchSchedules()
      }
    }

    if (targetRef.current && isMore) {
      observer = new IntersectionObserver(handleIntersect)

      observer.observe(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [isMore])

  if (isPending)
    return (
      <div className='flex justify-center pt-10'>
        <FaSpinner className='animate-spin text-7xl' color='#00a4e8' />
      </div>
    )
  return (
    <>
      {schedules.length ? (
        <ul className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[2560px]:grid-cols-5'>
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
