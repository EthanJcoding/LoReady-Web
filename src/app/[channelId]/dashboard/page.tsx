import AdditionalConts from '@/components/dashboard/AdditionalConts'
import UpcomingRaid from '@/components/dashboard/UpcomingRaid'

interface Ownprops {
  params: {
    channelId: string
  }
}

export default async function Dashboard({ params: { channelId } }: Ownprops) {
  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <UpcomingRaid channelId={channelId} />
      <AdditionalConts />
    </div>
  )
}
