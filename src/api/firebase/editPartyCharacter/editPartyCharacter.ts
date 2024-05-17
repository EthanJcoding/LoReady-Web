import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/Schedule'

interface characterData {
  userId: string
  character: string
}

async function editPartyCharacter(
  scheduleId: string,
  partyIdx: string,
  pushingData: characterData,
  removingCharacterName: string
) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      const scheduleData = data.data()
      const parties = { ...scheduleData.parties }
      const updatedParty = parties[partyIdx].filter((cha: Character) => cha.character !== removingCharacterName)
      updatedParty.push(pushingData)
      parties[partyIdx] = updatedParty

      const characters = [...scheduleData.characters].filter(
        (cha: Character) => cha.character !== removingCharacterName
      )

      characters.push(pushingData)

      await updateDoc(scheduleRef, { parties, updated: serverTimestamp(), characters })
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { editPartyCharacter }
