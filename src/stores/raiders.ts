import { create } from 'zustand'

interface RaidersType {
  discordId: string
  character: string
  class: string
  itemLevel: string
}

interface RaidersStoreType {
  raiders: RaidersType[]
  setRaiders: (raiders: RaidersType[]) => void
}

export const useRaidersStore = create<RaidersStoreType>(set => ({
  raiders: [],
  setRaiders: raiders => set({ raiders })
}))
