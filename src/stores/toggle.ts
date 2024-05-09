import { create } from 'zustand'

interface ToggleStore {
  isActive: boolean
  setIsActive: () => void
}

export const useToggleStore = create<ToggleStore>(set => ({
  isActive: false,
  setIsActive: () => set(state => ({ isActive: !state.isActive }))
}))
