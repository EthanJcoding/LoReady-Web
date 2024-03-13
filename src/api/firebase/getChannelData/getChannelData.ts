import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config'

async function getChannelData(channelId: string) {
  const channelRef = doc(firestore, 'channels', channelId)

  try {
    const data = await getDoc(channelRef)

    if (data.exists()) {
      return data.data()
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching channel data:', err)

    return null
  }
}

export { getChannelData }
