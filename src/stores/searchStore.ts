import { create } from 'zustand'
import { searchCharacter } from '@/api/firebase/searchCharacter/searchCharacter'
import {
  ArmoryAvatarsInterface,
  ArmoryCardsInterface,
  ArmoryEngravingInterface,
  ArmoryEquipmentInterface,
  ArmoryGemInterface,
  ArmoryProfileInterface,
  ArmorySkillsInterface
} from '@/types/Equipments/armory'

interface CharacterData {
  ArmoryAvatars: ArmoryAvatarsInterface[]
  ArmoryCard: ArmoryCardsInterface
  ArmoryEngraving: ArmoryEngravingInterface
  ArmoryEquipment: ArmoryEquipmentInterface[]
  ArmoryGem: ArmoryGemInterface
  ArmoryProfile: ArmoryProfileInterface
  ArmorySkills: ArmorySkillsInterface[]
}

interface CharacterState {
  character: CharacterData | null
  isLoading: boolean
  error: Error | null
  searchCharacter: (character: string) => Promise<void>
}

export const useSearchStore = create<CharacterState>(set => ({
  character: null,
  isLoading: false,
  error: null,
  searchCharacter: async (character: string) => {
    set({ isLoading: true, error: null })
    try {
      const data = await searchCharacter(character)

      if (data) {
        set({ character: data as CharacterData, isLoading: false })
      } else {
        throw new Error('Character data not found')
      }
    } catch (error) {
      console.error('Error in searchCharacter:', error)
      set({ error: error instanceof Error ? error : new Error('An unknown error occurred'), isLoading: false })
    }
  }
}))
