import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { firestore } from '../config'

interface Schedule {
  created: string
  raidLeader: Character
  raidType: string
  isActive: boolean
  createdBy: string
  updated: string
  raidDate: string
  raidName: string
  participants: string[]
  characters: Characters
  channel: string
}

interface Characters {
  party0: Character[]
  party2: Character[]
  party1: Character[]
}

interface Character {
  character: string
  userId: string
}

export interface ScheduleData extends Schedule {
  id: string
}

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
    const data: ScheduleData[] = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Schedule) }))

    return { data, lastSnap }
  } catch (error) {
    throw error
  }
}
