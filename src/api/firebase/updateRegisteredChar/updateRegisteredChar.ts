import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'

async function updateRegisteredChar(userId: string, updatedRegistered: string) {
  const userRef = doc(firestore, 'users', userId)

  try {
    await updateDoc(userRef, {
      registeredBy: updatedRegistered,
      updated: serverTimestamp()
    })
  } catch (err) {
    console.log(err)
  }
}

export { updateRegisteredChar }
