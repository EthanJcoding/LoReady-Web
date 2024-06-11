import { getScheduleData } from '@/api/firebase'
import { getCharacterData } from '@/api/lostark/getCharacterData'
import Raid from '@/components/scheduleDetail/Raid'
import { Schedule } from '@/types/raid'
import { getChannelData } from '@/api/firebase'
import { authOptions } from '@/utils/authOptions'
import { validateMember } from '@/utils/validateMember'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

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

export async function generateMetadata({ params: { channelId, scheduleId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const scheduleData = await getScheduleData(scheduleId)
  const isValidMember = validateMember(session?.user.id, channelData?.memberIds)

  if (!isValidMember) return

  if (isValidMember && scheduleData?.channel !== channelId)
    return {
      title: 'Not found',
      description: '페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.'
    }

  return {
    title: `${scheduleData?.raidName} ${scheduleData?.raidType}`,
    description: '레이드의 공대 구성을 편집하고 공대원의 캐릭터 정보를 확인할 수 있습니다.'
  }
}

export default async function ScheduleDetail({ params }: Ownprops) {
  const { channelId, scheduleId } = params
  const scheduleData = (await getScheduleData(scheduleId)) as Schedule

  if (scheduleData?.channel !== channelId) notFound()
  const { raidType, raidLeader, characters, raidName, raidDate } = scheduleData

  const parties = await fetchCharacterData(scheduleData)

  return (
    <div className='flex-1 flex flex-col gap-4 sm:flex-row overflow-scroll'>
      <Raid
        parties={parties}
        raidType={raidType}
        raidLeader={raidLeader}
        characters={characters}
        raidName={raidName}
        raidDate={raidDate}
      />
    </div>
  )
}
