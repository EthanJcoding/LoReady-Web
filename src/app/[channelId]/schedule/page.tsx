import { getChannelData } from '@/api/firebase'
import PartyList from '@/components/partyList/PartyList'
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
    title: channelName ? `${channelName} 레이드 일정` : '레이드 일정',
    description: `참여중인 디스코드 서버(로레디봇이 추가된 서버)의 예정된 로스트아크 레이드 일정을 확인할 수 있습니다.`
  }

  return metadata
}

export default async function Schedule({ params: { channelId } }: Ownprops) {
  channelId = '1050686760373469234'
  const data = await getChannelData(channelId)

  if (!data) return

  return (
    <div className='flex flex-wrap gap-5 overflow-x-auto min-w-0'>
      <PartyList channelId={channelId} />
    </div>
  )
}
