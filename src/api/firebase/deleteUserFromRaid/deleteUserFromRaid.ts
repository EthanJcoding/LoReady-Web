import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/Schedule'

async function deleteUserFromRaid(
  scheduleId: string,
  partyIdx: string,
  removingCharacterName: string,
  selectedUserId: string
) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      const scheduleData = data.data()
      const parties = { ...scheduleData.parties }
      const updatedParty = parties[partyIdx].filter((cha: Character) => cha.character !== removingCharacterName)

      const characters = [...scheduleData.characters].filter(
        (cha: Character) => cha.character !== removingCharacterName
      )

      parties[partyIdx] = updatedParty

      const participants = [...scheduleData.participants].filter(userId => userId !== selectedUserId)

      await updateDoc(scheduleRef, { parties, updated: serverTimestamp(), characters, participants })
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { deleteUserFromRaid }
