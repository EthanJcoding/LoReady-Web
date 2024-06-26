import { Character } from '@/types/raid'

export const findParty = (targetCharacter: string, parties: { [key: string]: Character[] }) => {
  if (parties.party1.some(character => character.character === targetCharacter)) {
    return 'party1'
  } else return 'party2'
}
