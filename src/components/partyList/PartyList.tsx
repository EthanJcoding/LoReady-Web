import { getChannelData } from '@/api/firebase'
import PartyListDetail from './PartyListDetail'

interface Ownprops {
  channelId: string
}

export default async function PartyList({ channelId }: Ownprops) {
  const data = await getChannelData(channelId)

  if (!data) return

  const scheduleIdArr = data.schedules

  return (
    <>
      {scheduleIdArr.map((scheduleId: string, index: number) => (
        <div className='h-auto border-solid border-2 rounded-md md:w-[350px]'>
          <ul key={index} className='flex flex-col gap-3 pb-2.5'>
            <PartyListDetail scheduleId={scheduleId} />
          </ul>
        </div>
      ))}
    </>
  )
}
