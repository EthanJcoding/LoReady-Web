import { getChannelData } from '@/api/firebase'
import PartyListDetail from './PartyListDetail'
import RaidList from '@/components/dashboard/RaidList'

interface Ownprops {
  channelId: string
}

export default async function PartyList({ channelId }: Ownprops) {
  channelId = '1209059689657016371'
  const data = await getChannelData(channelId)

  if (!data) return

  return (
    <div className='h-auto border-solid border-2 rounded-md w-full md:w-[350px]'>
      <ul className='flex flex-col gap-3 pb-2.5'>
        {data.schedules.map((scheduleId: string) => (
          <>
            <RaidList key={scheduleId} scheduleId={scheduleId} />
            <PartyListDetail scheduleId={data.scheduleId} />
          </>
        ))}
      </ul>
    </div>
  )
}
