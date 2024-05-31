import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore } from '../config'

async function deleteRaid(channelId: string, scheduleId: string) {
  // 해당 채널에서 schedules 배열 업데이트
  // 해당 채널에서 유저리스트를 반복문으로 돌면서 유저 컬렉션의 schedules 배열을 정리
  // 스케줄 컬렉션에서 해당 scheduleId 문서 삭제
  const channelRef = doc(firestore, 'channels', channelId)

  const scheduleRef = doc(firestore, 'schedules', scheduleId)

  try {
    const channelSnapshot = await getDoc(channelRef)

    if (channelSnapshot.exists()) {
      const channelData = channelSnapshot.data()
      const newScheduleArr = [...channelData.schedules].filter(schId => schId !== scheduleId)

      await updateDoc(channelRef, { schedules: newScheduleArr })

      const { memberIds } = channelSnapshot.data()

      for (let i = 0; i < memberIds.length; i++) {
        const userRef = doc(firestore, 'users', memberIds[i])
        const data = await getDoc(userRef)

        if (data.exists()) {
          const userData = data.data()
          const newScheduleArrForUser = [...userData.schedules].filter(schId => schId !== scheduleId)

          await updateDoc(userRef, { schedules: newScheduleArrForUser, updated: serverTimestamp() })
        }
      }
    }

    await deleteDoc(scheduleRef)
  } catch (err) {
    console.log(err)
  }
}

export { deleteRaid }
