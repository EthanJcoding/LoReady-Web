import { create } from 'zustand'
import { Character } from '@/types/raid'

interface CharacterState {
  dropdownSelectedCharacter: Character | undefined
  setDropdownSelectedCharacter: (character: Character | undefined) => void
}

const useDropdonwStore = create<CharacterState>(set => ({
  dropdownSelectedCharacter: undefined,
  setDropdownSelectedCharacter: character => set({ dropdownSelectedCharacter: character })
}))

export default useDropdonwStore
