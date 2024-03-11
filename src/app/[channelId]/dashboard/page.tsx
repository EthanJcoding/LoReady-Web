import { getChannelData } from '@/api/firebase'
import AdditionalConts from '@/components/dashboard/AdditionalConts'
import UpcomingRaid from '@/components/dashboard/UpcomingRaid'

interface Ownprops {
  params: {
    channelId: string
  }
}

export default async function Dashboard({ params: { channelId } }: Ownprops) {
  //FIXME: 작업 완료 후 channelId 할당 삭제하기
  channelId = '1050686760373469234'
  const data = await getChannelData(channelId)

  console.log(data)

  if (!data) return
  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <UpcomingRaid channelId={channelId} />
      <AdditionalConts />
    </div>
  )
}
