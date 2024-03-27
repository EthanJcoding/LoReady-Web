import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../config'
import { Channel } from '@/types/channel'

export const getUserChannels = async (userId: string) => {
  const channelQuery = query(collection(firestore, 'channels'), where('memberIds', 'array-contains', userId))

  try {
    const snapshot = await getDocs(channelQuery)

    if (snapshot.empty) return []

    const data: Channel[] = snapshot.docs.map(doc => doc.data() as Channel)

    return data
  } catch (error) {
    throw error
  }
}
