import { getChannelData } from '@/api/firebase'
import RaidList from './RaidList'
interface Ownprops {
  channelId: string
}

export default async function UpcomingRaid({ channelId }: Ownprops) {
  //FIXME: 작업 완료 후 channelId 할당 삭제하기
  channelId = '1050686760373469234'
  const data = await getChannelData(channelId)

  if (!data) return
  return (
    <div className='card basis-1/3 bg-secondary-accent/50 dark:bg-primary-accent/80'>
      <div className='pb-4 text-xl'>다가오는 레이드</div>
      <ul className='flex flex-col gap-3'>
        {data.schedules.map((scheduleId: string) => (
          <RaidList key={scheduleId} scheduleId={scheduleId} />
        ))}
      </ul>
    </div>
  )
}
