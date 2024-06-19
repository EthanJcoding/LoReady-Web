import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { customDateString } from '@/utils/customDateString'

interface characterData {
  userId: string
  character: string
}

async function addUserToRaid(scheduleId: string, partyIdx: string, pushingData: characterData) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)
  const characterAndUserId = { userId: pushingData.userId, character: pushingData.character }

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      const scheduleData = data.data()
      const updatedParties = { ...scheduleData.parties }
      updatedParties[partyIdx].push(characterAndUserId)

      const updatedCharacters = [...scheduleData.characters]
      updatedCharacters.push(characterAndUserId)

      const updatedParticipants = [...scheduleData.participants]
      updatedParticipants.push(characterAndUserId.userId)

      await updateDoc(scheduleRef, {
        parties: updatedParties,
        updated: customDateString(),
        characters: updatedCharacters,
        participants: updatedParticipants
      })
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { addUserToRaid }
