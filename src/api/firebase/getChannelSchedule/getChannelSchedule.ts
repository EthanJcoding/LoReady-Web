import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { firestore } from '../config'
import { Schedule, ScheduleWithId } from '@/types/schedule'

const convertToCustomFormat = (isoString: string): string => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const getChannelSchedule = async (channelId: string, lastSnap?: Schedule, userId?: string) => {
  const now = convertToCustomFormat(new Date().toISOString())

  let scheduleQuery = query(
    collection(firestore, 'schedules'),
    where('channel', '==', channelId),
    where('raidDate', '>=', now),
    orderBy('raidDate', 'asc'),
    orderBy('created', 'asc')
  )

  if (userId) scheduleQuery = query(scheduleQuery, where('participants', 'array-contains', userId))
  if (lastSnap) scheduleQuery = query(scheduleQuery, startAfter(lastSnap.raidDate, lastSnap.created))

  scheduleQuery = query(scheduleQuery, limit(10))

  try {
    const snapshot = await getDocs(scheduleQuery)

    if (snapshot.empty) return { data: [], lastSnap: undefined }

    const lastSnap = snapshot.docs[snapshot.docs.length - 1].data() as Schedule
    const data: ScheduleWithId[] = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Schedule) }))

    return { data, lastSnap }
  } catch (error) {
    throw error
  }
}
