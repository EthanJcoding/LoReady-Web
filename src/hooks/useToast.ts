import { useToastStore } from '@/stores/toast'

export const useToast = () => {
  const { isShow, setIsShow, setMessage } = useToastStore(state => state)

  const toast = (message: string) => {
    // if (isShow) return

    setIsShow(true)
    setMessage(message)
    setTimeout(() => {
      setIsShow(false)
    }, 3000)
  }

  return toast
}
