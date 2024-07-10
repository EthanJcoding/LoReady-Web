import { Schedule } from '@/types/schedule'
import { MutableRefObject, useEffect, useRef } from 'react'

export const useInfiniteScroll = (
  callback: () => void,
  isMore: boolean,
  lastSnapRef: MutableRefObject<Schedule | undefined>
) => {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && isMore) {
        callback()
      }
    }
    const observer = new IntersectionObserver(handleIntersect)

    if (targetRef.current && isMore) {
      observer.observe(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [isMore, lastSnapRef.current])

  return targetRef
}
