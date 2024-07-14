import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../config'
import { getCharacterData } from '@/api/lostark/getCharacterData'
import { customDateString } from '@/utils/customDateString'

async function searchCharacter(character: string) {
  const characterRef = doc(firestore, 'characters', character)

  try {
    const docSnapshot = await getDoc(characterRef)

    if (docSnapshot.exists()) {
      const data = docSnapshot.data()
      const lastUpdated = new Date(data.updated)
      const oneDayAgo = new Date(customDateString(1))

      if (lastUpdated < oneDayAgo) {
        // 데이터가 1일 이상 지났으면 업데이트
        const newData = await getCharacterData(character)
        await setDoc(characterRef, { ...newData, updated: customDateString() })
        return newData
      } else {
        // 데이터가 최신이면 그대로 반환
        return data // 데이터 구조에 따라 'newData' 필드가 없다면 그냥 'data'를 반환
      }
    } else {
      // 데이터가 없으면 새로 가져와서 저장
      const newData = await getCharacterData(character)

      if (newData) {
        await setDoc(characterRef, { ...newData, updated: customDateString() })
        return newData
      } else return null
    }
  } catch (err) {
    console.error('Error in searchCharacter:', err)
    throw err // 오류를 상위로 전파
  }
}

export { searchCharacter }
