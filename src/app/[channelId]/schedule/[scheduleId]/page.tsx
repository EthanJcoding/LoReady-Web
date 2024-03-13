import { getScheduleData, getUserCharacterData, getUserData } from '@/api/firebase'
import RaiderInfo from '@/components/scheduleDetail/RaiderInfo'
import Raiders from '@/components/scheduleDetail/Raiders'
import { CharacterInfoType, CharacterType } from '@/types/character'
import { RaidType, RaiderType } from '@/types/raid'

export default async function ScheduleDetail() {
  let characters: CharacterType[] = []
  let raidType: RaidType = '8인레이드'
  let characterInfos: RaiderType[] = []

  try {
    const scheduleData = await getScheduleData('57FNJZW3G0hI2hXcVK1v')
    if (scheduleData) {
      characters = scheduleData.characters
      raidType = scheduleData.raidType
      await characters.reduce(async (prevPromise, nextData) => {
        await prevPromise
        const characterData = await getUserCharacterData(nextData.userId, nextData.character)
        const userData = await getUserData(nextData.userId).then(data => {
          if (data) return data.globalName
        })
        const raiderData = { ...characterData, userName: userData }

        if (raiderData) {
          characterInfos.push(raiderData as RaiderType)
        }
      }, Promise.resolve())
      console.log(characters)
    }
  } catch (err) {
    console.log(err)
  }

  return (
    <div className='flex-1 flex gap-5'>
      <Raiders raidersData={characterInfos} raidType={raidType} />
      <RaiderInfo />
    </div>
  )
}
