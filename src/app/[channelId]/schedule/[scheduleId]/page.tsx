import { getScheduleData } from '@/api/firebase'
import { getCharacterData } from '@/api/lostark/getCharacterData'
import Raid from '@/components/scheduleDetail/Raid'
import { Schedule } from '@/types/raid'

interface Ownprops {
  params: {
    channelId: string
    scheduleId: string
  }
}

interface Character {
  userId: string
  character: string
  data?: any
}

async function fetchCharacterData(scheduleData: Schedule) {
  const characterDataByParty: { [key: string]: Character[] } = {}

  for (const [partyKey, party] of Object.entries(scheduleData.parties)) {
    characterDataByParty[partyKey] = []

    for (const user of party) {
      try {
        const characterData = await getCharacterData(user.character)

        user.data = characterData
        characterDataByParty[partyKey].push(user)
      } catch (err) {
        console.error(`Error fetching data for character ${user.character}:`, err)
      }
    }
  }

  return characterDataByParty
}

export default async function ScheduleDetail({ params }: Ownprops) {
  const { channelId, scheduleId } = params

  const scheduleData = (await getScheduleData(scheduleId)) as Schedule

  const parties = await fetchCharacterData(scheduleData)

  return (
    <>
      <Raid parties={parties} />
    </>
  )
}
