import { getChannelData, getChannelSchedule } from '@/api/firebase'
import AdditionalConts from '@/components/dashboard/AdditionalConts'
import UpcomingRaid from '@/components/dashboard/UpcomingRaid'
import { authOptions } from '@/utils/authOptions'
import { validateMember } from '@/utils/validateMember'
import { getServerSession } from 'next-auth'

interface Ownprops {
  params: {
    channelId: string
  }
}

export async function generateMetadata({ params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const isValidMember = validateMember(session?.user.id, channelData?.memberIds)
  const channelName: string = channelData?.channelName || ''

  if (!isValidMember) return

  return {
    title: `${channelName} - 대시보드`,
    description:
      '참여중인 디스코드 서버(로레디봇이 추가된 서버)의 다가오는 로스트아크 레이드와 로스트아크 이번 주 도전 정보를 확인할 수 있습니다.'
  }
}

export default async function Dashboard({ params: { channelId } }: Ownprops) {
  const { data, lastSnap } = await getChannelSchedule(channelId)

  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <UpcomingRaid channelId={channelId} schedulesData={data} initialSnapshotData={lastSnap} />
      <AdditionalConts />
    </div>
  )
}
