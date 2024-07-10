'use client'

import { useEffect } from 'react'
import RaidList from './RaidList'
import { useFetchSchedules } from '@/hooks/useFetchSchedules'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { FaSpinner } from 'react-icons/fa'

interface Ownprops {
  channelId: string
}

export default function UpcomingRaid({ channelId }: Ownprops) {
  const { schedules, isPending, isMore, lastSnapRef, fetchSchedules } = useFetchSchedules(channelId)
  const targetRef = useInfiniteScroll(fetchSchedules, isMore, lastSnapRef)

  useEffect(() => {
    fetchSchedules(true)
  }, [])

  return (
    <div className='card p-0 flex flex-col basis-full md:basis-1/2 xl:basis-1/3 overflow-hidden'>
      <div className='relative flex flex-col h-full bg-[#fee2e5] dark:bg-[#0080b7] overflow-y-auto custom-scrollbar'>
        <div className='flex justify-between p-4 pb-4 text-xl font-medium bg-inherit sticky top-0 left-0 z-20 -translate-y-[1px] md:p-5'>
          다가오는 레이드
        </div>
        <ul className='flex flex-col gap-3 px-4 pb-5 md:px-5'>
          {isPending ? (
            <li className='flex justify-center pt-10'>
              <FaSpinner className='animate-spin text-3xl' color='#00a4e8' />
            </li>
          ) : schedules.length ? (
            schedules.map(schedule => (
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
            ))
          ) : (
            <li className='py-10 text-center text-xl font-medium text-dark/60 dark:text-light/90'>
              예정된 레이드가 없습니다.
            </li>
          )}
        </ul>
        {isMore && <div ref={targetRef}></div>}
      </div>
    </div>
  )
}
