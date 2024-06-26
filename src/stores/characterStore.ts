import { create } from 'zustand'
import { Character } from '@/types/raid'
import { getCharacterData } from '@/api/lostark/getCharacterData'

interface CharacterState {
  selectedCharacter: Character | undefined
  setSelectedCharacter: (character: Character | undefined) => void
}

const useCharacterStore = create<CharacterState>(set => ({
  selectedCharacter: undefined,
  setSelectedCharacter: async character => {
    if (character) {
      const characterData = await getCharacterData(character.character)
      character.data = characterData
    }
    set({ selectedCharacter: character })
  }
}))

export default useCharacterStore
