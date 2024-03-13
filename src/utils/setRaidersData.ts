import { getScheduleData, getUserCharacterData, getUserData } from '@/api/firebase'
import { CharacterType } from '@/types/character'
import { RaiderType } from '@/types/raid'
import { DocumentData } from 'firebase/firestore'

export default async function setRaidersData(scheduleData: DocumentData, party: string) {
  let RaidersData: RaiderType[] = []

  await scheduleData.characters[party].reduce(async (prevPromise: Promise<void>, nextData: CharacterType) => {
    await prevPromise
    const characterData = await getUserCharacterData(nextData.userId, nextData.character)
    const userData = await getUserData(nextData.userId).then(data => {
      if (data) return data.globalName
    })
    const raiderData = { ...characterData, userName: userData }

    if (raiderData) {
      RaidersData.push(raiderData as RaiderType)
    }
  }, Promise.resolve())

  return RaidersData
}
