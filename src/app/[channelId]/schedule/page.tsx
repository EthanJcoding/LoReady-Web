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
    <div className='flex flex-wrap gap-5 overflow-x-auto min-w-0'>
      <PartyList channelId={channelId} />
    </div>
  )
}
