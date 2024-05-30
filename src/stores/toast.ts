import { create } from 'zustand'

interface ToastStore {
  isShow: boolean
  message: string
  setIsShow: (isShow: boolean) => void
  setMessage: (message: string) => void
}

export const useToastStore = create<ToastStore>(set => ({
  isShow: false,
  message: '',
  setIsShow: isShow => set(() => ({ isShow: isShow })),
  setMessage: message => set(() => ({ message: message }))
}))
