import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/Schedule'

async function updateRaidLeader(scheduleId: string, newRaidLeader: Character) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    await updateDoc(scheduleRef, {
      raidLeader: newRaidLeader,
      updated: serverTimestamp()
    })
  } catch (err) {
    console.log(err)
  }
}

export { updateRaidLeader }
