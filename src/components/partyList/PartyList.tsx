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
    <div>
      <SchedulesFilter />
      <div className='flex flex-wrap'>
        {scheduleIdArr.map((scheduleId: string, index: number) => (
          <div key={index} className=''>
            <ul className='flex flex-col'>
              <PartyListDetail scheduleId={scheduleId} />
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
