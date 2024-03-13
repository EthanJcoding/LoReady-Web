import { RaiderType } from '@/types/raid'
import { create } from 'zustand'

interface RaidersStoreType {
  raiders: RaiderType[]
  firstPartyRaiders: RaiderType[]
  secondPartyRaiders: RaiderType[]
  setRaiders: (raiders: RaiderType[]) => void
  setFirstPartyRaiders: (raiders: RaiderType[]) => void
  setSecondPartyRaiders: (raiders: RaiderType[]) => void
}

export const useRaidersStore = create<RaidersStoreType>(set => ({
  raiders: [],
  firstPartyRaiders: [],
  secondPartyRaiders: [],
  setRaiders: raiders => set({ raiders }),
  setFirstPartyRaiders: firstPartyRaiders => set({ firstPartyRaiders }),
  setSecondPartyRaiders: secondPartyRaiders => set({ secondPartyRaiders })
}))
