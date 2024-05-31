import { create } from 'zustand'

interface ToastStore {
  isShow: boolean
  message: string
  toastElKey: number
  setIsShow: (isShow: boolean) => void
  setMessage: (message: string) => void
  setToastElKey: () => void
}

export const useToastStore = create<ToastStore>(set => ({
  isShow: false,
  message: '',
  toastElKey: 0,
  setIsShow: isShow => set(() => ({ isShow: isShow })),
  setMessage: message => set(() => ({ message: message })),
  setToastElKey: () => set(state => ({ toastElKey: state.toastElKey + 1 }))
}))
