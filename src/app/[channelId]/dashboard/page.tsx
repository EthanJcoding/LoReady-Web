import { getChannelData } from '@/api/firebase'
import AdditionalConts from '@/components/dashboard/AdditionalConts'
import UpcomingRaid from '@/components/dashboard/UpcomingRaid'
import { Metadata } from 'next'

interface Ownprops {
  params: {
    channelId: string
  }
}

export async function generateMetadata({ params: { channelId } }: Ownprops) {
  const data = await getChannelData(channelId)
  const channelName: string = data?.channelName

  const metadata: Metadata = {
    title: channelName ? `${channelName} 대시보드` : '대시보드',
    description:
      '참여중인 디스코드 서버(로레디봇이 추가된 서버)의 다가오는 로스트아크 레이드와 로스트아크 이번 주 도전 정보를 확인할 수 있습니다.'
  }

  return metadata
}

export default async function Dashboard({ params: { channelId } }: Ownprops) {
  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <UpcomingRaid channelId={channelId} />
      <AdditionalConts />
    </div>
  )
}
