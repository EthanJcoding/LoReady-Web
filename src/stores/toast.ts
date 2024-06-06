import { ToastType } from '@/types/toast'
import { create } from 'zustand'

interface ToastStore {
  isShow: boolean
  message: string
  toastType: ToastType
  toastElKey: number
  setIsShow: (isShow: boolean) => void
  setMessage: (message: string) => void
  setToastType: (toastType: ToastType | undefined) => void
  setToastElKey: () => void
}

export const useToastStore = create<ToastStore>(set => ({
  isShow: false,
  message: '',
  toastType: 'success',
  toastElKey: 0,
  setIsShow: isShow => set({ isShow }),
  setMessage: message => set({ message }),
  setToastType: toastType => set({ toastType }),
  setToastElKey: () => set(state => ({ toastElKey: state.toastElKey + 1 }))
}))
