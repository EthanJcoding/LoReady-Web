import { create } from 'zustand'

interface RaidersType {
  discordId: string
  character: string
  class: string
  itemLevel: string
}

interface RaidersStoreType {
  raiders: RaidersType[]
  firstPartyRaiders: RaidersType[]
  secondPartyRaiders: RaidersType[]
  setRaiders: (raiders: RaidersType[]) => void
  setFirstPartyRaiders: (raiders: RaidersType[]) => void
  setSecondPartyRaiders: (raiders: RaidersType[]) => void
}

export const useRaidersStore = create<RaidersStoreType>(set => ({
  raiders: [],
  firstPartyRaiders: [],
  secondPartyRaiders: [],
  setRaiders: raiders => set({ raiders }),
  setFirstPartyRaiders: raiders => set({ raiders }),
  setSecondPartyRaiders: raiders => set({ raiders })
}))
