import { getChannelData } from '@/api/firebase'
import PartyListDetail from './PartyListDetail'
import RaidList from '@/components/dashboard/RaidList'
import Link from 'next/link'

interface Ownprops {
  channelId: string
}

export default async function PartyList({ channelId }: Ownprops) {
  channelId = '1209059689657016371'
  const data = await getChannelData(channelId)
  const enableRouting = false

  if (!data) return
  return (
    <div className='h-auto border-solid border-2 rounded-md md:w-[350px]'>
      <ul className='flex flex-col gap-3 pb-2.5'>
        {data.schedules.map((scheduleId: string) => (
          <Link href={`/${channelId}/schedule/${scheduleId}`}>
            <RaidList key={scheduleId} scheduleId={scheduleId} enableRouting={enableRouting} />
            <PartyListDetail scheduleId={data.scheduleId} />
          </Link>
        ))}
      </ul>
    </div>
  )
}
