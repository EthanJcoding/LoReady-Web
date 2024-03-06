import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from './sdk'

const db = getFirestore(app)

export async function getSchdules(docName: string) {
  const ref = doc(db, 'schedules', docName)
  const snapshot = await getDoc(ref)
  if (snapshot.exists()) {
    return snapshot.data()
  }
}
