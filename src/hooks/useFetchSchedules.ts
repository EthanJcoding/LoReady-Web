import { getChannelSchedule } from '@/api/firebase'
import { Schedule, ScheduleWithId } from '@/types/schedule'
import { useCallback, useRef, useState } from 'react'

export const useFetchSchedules = (
  channelId: string,
  userId: string | undefined = undefined,
  isShowMySchedule: boolean = false
) => {
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([])
  const [isPending, setIsPending] = useState(true)
  const [isMore, setIsMore] = useState(false)
  const lastSnapRef = useRef<Schedule | undefined>(undefined)

  const fetchSchedules = useCallback(
    async (initial = false) => {
      try {
        if (initial) setIsPending(true)

        const startTime = Date.now()
        const { data, lastSnap } = await getChannelSchedule(
          channelId,
          initial ? undefined : lastSnapRef.current,
          isShowMySchedule ? userId : undefined
        )
        const elapsedTime = Date.now() - startTime
        const delayTime = Math.max(200 - elapsedTime, 0)

        if (initial) {
          await new Promise(resolve => setTimeout(resolve, delayTime))
          setSchedules(data)
        } else {
          setSchedules(prevSchedules => [...prevSchedules, ...data])
        }

        lastSnapRef.current = lastSnap
        setIsMore(lastSnap !== undefined)
      } catch (error) {
        console.log('Failed to fetch schedules:', error)
      } finally {
        if (initial) setIsPending(false)
      }
    },
    [isShowMySchedule]
  )

  return { schedules, isPending, isMore, lastSnapRef, fetchSchedules }
}
