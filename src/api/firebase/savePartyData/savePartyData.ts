import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'

interface party {
  userId: string
  character: string
}

async function savePartyData(scheduleId: string, party1: party[], party2: party[]) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      await updateDoc(scheduleRef, {
        parties: { party1, party2 }
      })
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { savePartyData }
