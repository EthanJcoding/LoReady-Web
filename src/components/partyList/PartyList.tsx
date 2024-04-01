import { getChannelData } from '@/api/firebase'
import PartyListDetail from './PartyListDetail'
import SchedulesFilter from '../ScheduleFilter/ScheduleFilter'
interface Ownprops {
  channelId: string
}

export default async function PartyList({ channelId }: Ownprops) {
  const data = await getChannelData(channelId)
  if (!data) return
  const scheduleIdArr = data.schedules

  return (
    <>
      <SchedulesFilter />
      {scheduleIdArr.map((scheduleId: string, index: number) => (
        <div>
          <ul key={index} className='flex flex-col gap-3'>
            <PartyListDetail scheduleId={scheduleId} />
          </ul>
        </div>
      ))}
    </>
  )
}
