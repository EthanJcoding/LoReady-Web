import Raid from '@/components/scheduleDetail/Raid'
import { getChannelData, getScheduleData } from '@/api/firebase'
import { authOptions } from '@/utils/authOptions'
import { validateMember } from '@/utils/validateMember'
import { getServerSession } from 'next-auth'

interface Ownprops {
  params: {
    channelId: string
    scheduleId: string
  }
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
  const { scheduleId } = params

  const userData = await getServerSession(authOptions)

  return (
    <div className='max-w-[121rem] flex-1 flex flex-col gap-4 sm:flex-row h-full overflow-auto'>
      <Raid userData={userData} scheduleId={scheduleId} />
    </div>
  )
}
