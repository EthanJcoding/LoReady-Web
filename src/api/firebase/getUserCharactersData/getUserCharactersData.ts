import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config'

async function getUserCharacterData(userId: string, character: string) {
  const userRef = doc(firestore, 'users', userId, 'characters', character)

  try {
    const data = await getDoc(userRef)

    if (data.exists()) {
      return data.data()
    } else {
      return null
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    return null
  }
}

export { getUserCharacterData }
