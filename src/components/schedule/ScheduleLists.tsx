'use client'

import { useEffect, useRef, useState } from 'react'
import ScheduleList from './ScheduleList'
import { getChannelSchedule } from '@/api/firebase'
import { Schedule, ScheduleWithId } from '@/types/schedule'
import { useToggleStore } from '@/stores/toggle'
import { useSession } from 'next-auth/react'
import { FaSpinner } from 'react-icons/fa'

interface Ownprops {
  channelId: string
}

export default function ScheduleLists({ channelId }: Ownprops) {
  const [isPending, setIsPending] = useState(true)
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([])
  const [lastSnapshot, setLastSnapshot] = useState<Schedule | undefined>()
  const [isMore, setIsMore] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const isActive = useToggleStore(state => state.isActive)
  const session = useSession()
  const userId: string | undefined = session.data?.user?.id

  const fetchSchedules = async (initial = false) => {
    try {
      if (initial) await new Promise(resolve => setTimeout(resolve, 400))

      const { data, lastSnap } = await getChannelSchedule(
        channelId,
        initial ? undefined : lastSnapshot,
        isActive ? userId : undefined
      )
      setSchedules(initial ? data : prevSchedules => [...prevSchedules, ...data])
      setLastSnapshot(lastSnap)
      setIsMore(lastSnap !== undefined)
    } catch (error) {
      console.log(error)
    } finally {
      if (initial) setIsPending(false)
    }
  }

  // 초기 fetching
  useEffect(() => {
    setIsPending(true)
    fetchSchedules(true)
  }, [isActive])

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
  }, [lastSnapshot, isMore])

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
