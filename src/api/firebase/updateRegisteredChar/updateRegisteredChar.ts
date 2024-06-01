import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { customDateString } from '@/utils/customDateString'

async function updateRegisteredChar(userId: string, updatedRegistered: string) {
  const userRef = doc(firestore, 'users', userId)

  try {
    await updateDoc(userRef, {
      registeredBy: updatedRegistered,
      updated: customDateString()
    })
  } catch (err) {
    console.log(err)
  }
}

export { updateRegisteredChar }
