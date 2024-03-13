import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config'

async function getScheduleData(scheduleId: string) {
  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    const data = await getDoc(scheduleRef)

    if (data.exists()) {
      return data.data()
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching schedule data:', err)

    return null
  }
}

export { getScheduleData }
