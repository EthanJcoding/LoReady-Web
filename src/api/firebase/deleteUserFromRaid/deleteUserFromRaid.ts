import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/schedule'
import { customDateString } from '@/utils/customDateString'
import { findParty } from '@/utils/findParty'

async function deleteUserFromRaid(scheduleId: string, removingCharacter: Character, parties: any) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  const partyIdx = findParty(removingCharacter.character, parties)

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      const scheduleData = data.data()
      const parties = { ...scheduleData.parties }
      const updatedParty = parties[partyIdx].filter((cha: Character) => cha.character !== removingCharacter.character)

      const characters = [...scheduleData.characters].filter(
        (cha: Character) => cha.character !== removingCharacter.character
      )

      parties[partyIdx] = updatedParty

      const participants = [...scheduleData.participants].filter(userId => userId !== removingCharacter.userId)

      if (removingCharacter.character === scheduleData.raidLeader.character) {
        const newRaidLeader = characters[0]
        await updateDoc(scheduleRef, {
          parties,
          updated: customDateString(),
          characters,
          participants,
          raidLeader: newRaidLeader
        })
      } else {
        await updateDoc(scheduleRef, {
          parties,
          updated: customDateString(),
          characters,
          participants
        })
      }
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { deleteUserFromRaid }
