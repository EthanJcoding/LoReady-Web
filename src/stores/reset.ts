import { create } from 'zustand'

interface ResetStore {
  resetFlag: boolean
  setResetFlag: (resetFlag: boolean) => void
}

export const useResetStore = create<ResetStore>(set => ({
  resetFlag: false,
  setResetFlag: resetFlag => set({ resetFlag })
}))
