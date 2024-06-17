import { useToastStore } from '@/stores/toast'
import { ToastOption } from '@/types/toast'
import { useEffect, useRef } from 'react'

export const useToast = () => {
  const { setIsShow, setMessage, setToastType, setToastElKey } = useToastStore(state => state)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const toast = (message: string, option?: ToastOption) => {
    const toastOption: ToastOption = {
      type: option?.type || 'success',
      duration: option?.duration || 3000
    }

    if (timer.current) clearTimeout(timer.current)

    setIsShow(true)
    setMessage(message)
    setToastType(toastOption.type)
    setToastElKey()

    timer.current = setTimeout(() => {
      setIsShow(false)
      timer.current = null
    }, toastOption.duration)
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
