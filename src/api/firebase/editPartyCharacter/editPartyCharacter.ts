import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/schedule'

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

      const raidLeader = scheduleData.raidLeader.character

      if (raidLeader === removingCharacterName) {
        const newRaidLeader = pushingData

        await updateDoc(scheduleRef, { parties, updated: serverTimestamp(), characters, raidLeader: newRaidLeader })
      } else {
        await updateDoc(scheduleRef, { parties, updated: serverTimestamp(), characters })
      }

      // 스케쥴에 인원이 한명이고 그 인원이 본인의 캐릭터를 수정하면 공대장도 이에 따라서 업데이트
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { editPartyCharacter }
