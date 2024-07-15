import { create } from 'zustand'
import { getCharacterList } from '@/api/lostark/getCharacterList'

interface Siblings {
  CharacterClassName: string
  CharacterLevel: number
  CharacterName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
  ServerName: string
}

interface CharacterState {
  siblings: Siblings[] | null
  isLoading: boolean
  error: Error | null
  searchSiblings: (character: string) => Promise<void>
  resetSiblings: () => void
}

function sortByItemAvgLevel(characters: Siblings[]) {
  return characters.sort((a, b) => {
    const levelA = parseFloat(a.ItemAvgLevel.replace(/,/g, ''))
    const levelB = parseFloat(b.ItemAvgLevel.replace(/,/g, ''))

    // 내림차순 정렬 (높은 순)
    return levelB - levelA
  })
}

export const useSiblingsStore = create<CharacterState>(set => ({
  siblings: null,
  isLoading: false,
  error: null,
  searchSiblings: async (character: string) => {
    set({ isLoading: true, error: null })
    try {
      const data = (await getCharacterList(character)) as Siblings[]

      if (data) {
        set({ siblings: sortByItemAvgLevel(data), isLoading: false })
      } else {
        throw new Error('Character data not found')
      }
    } catch (error) {
      console.error('Error in searchCharacter:', error)
      set({ error: error instanceof Error ? error : new Error('An unknown error occurred'), isLoading: false })
    }
  },
  resetSiblings: () => set({ siblings: null, error: null, isLoading: false })
}))
