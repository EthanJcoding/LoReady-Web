import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { Character } from '@/types/schedule'
import { customDateString } from '@/utils/customDateString'

async function updateRaidLeader(scheduleId: string, newRaidLeader: Character) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    await updateDoc(scheduleRef, {
      raidLeader: newRaidLeader,
      updated: customDateString()
    })
  } catch (err) {
    console.log(err)
  }
}

export { updateRaidLeader }
