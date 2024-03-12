import { CharacterInfoType } from '@/types/character'
import { create } from 'zustand'

interface RaidersStoreType {
  raiders: CharacterInfoType[]
  firstPartyRaiders: CharacterInfoType[]
  secondPartyRaiders: CharacterInfoType[]
  setRaiders: (raiders: CharacterInfoType[]) => void
  setFirstPartyRaiders: (raiders: CharacterInfoType[]) => void
  setSecondPartyRaiders: (raiders: CharacterInfoType[]) => void
}

export const useRaidersStore = create<RaidersStoreType>(set => ({
  raiders: [],
  firstPartyRaiders: [],
  secondPartyRaiders: [],
  setRaiders: raiders => set({ raiders }),
  setFirstPartyRaiders: raiders => set({ raiders }),
  setSecondPartyRaiders: raiders => set({ raiders })
}))
