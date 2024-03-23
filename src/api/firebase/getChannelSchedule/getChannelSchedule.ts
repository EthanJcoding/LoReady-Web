import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { firestore } from '../config'
import { Schedule, ScheduleWithId } from '@/types/channelSchedule'

export const getChannelSchedule = async (channelId: string, lastSnap?: DocumentData) => {
  let scheduleQuery = query(
    collection(firestore, 'schedules'),
    where('channel', '==', channelId),
    orderBy('raidDate', 'desc')
  )

  if (lastSnap) scheduleQuery = query(scheduleQuery, startAfter(lastSnap))

  scheduleQuery = query(scheduleQuery, limit(10))

  try {
    const snapshot = await getDocs(scheduleQuery)

    if (snapshot.empty) return { data: [], lastSnap: undefined }

    const lastSnap = snapshot.docs[snapshot.docs.length - 1]
    const data: ScheduleWithId[] = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Schedule) }))

    return { data, lastSnap }
  } catch (error) {
    throw error
  }
}
