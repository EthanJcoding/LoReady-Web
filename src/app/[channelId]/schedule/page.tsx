import { getChannelData } from '@/api/firebase'
import PartyList from '@/components/partyList/PartyList'

interface Ownprops {
  params: {
    channelId: string
  }
}

export default async function Schedule({ params: { channelId } }: Ownprops) {
  channelId = '1050686760373469234'
  const data = await getChannelData(channelId)

  if (!data) return

  return (
    <div className='flex-1 flex gap-5 flex-wrap overflow-y-scroll overscroll-y-auto'>
      <div className='h-auto '>
        <PartyList channelId={channelId} />
      </div>
    </div>
  )
}
