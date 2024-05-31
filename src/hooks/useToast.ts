import { useToastStore } from '@/stores/toast'
import { useEffect, useRef } from 'react'

export const useToast = () => {
  const { setIsShow, setMessage, setToastElKey } = useToastStore(state => state)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const toast = (message: string) => {
    if (timer.current) clearTimeout(timer.current)

    setIsShow(true)
    setMessage(message)
    setToastElKey()

    timer.current = setTimeout(() => {
      setIsShow(false)
      timer.current = null
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        setIsShow(false)
      }
    }
  }, [])

  return toast
}
