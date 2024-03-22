import { getChannelData } from '@/api/firebase'
import RaidList from './RaidList'
interface Ownprops {
  channelId: string
}

export default async function UpcomingRaid({ channelId }: Ownprops) {
  //FIXME: 작업 완료 후 channelId 할당 삭제하기
  channelId = '1209059689657016371'
  const data = await getChannelData(channelId)

  if (!data) return
  return (
    <div className='relative card min-w-[340px] basis-1/3 p-0 bg-[#fee2e5] dark:bg-[#0080b7] overflow-y-auto'>
      <div className='p-5 pb-4 text-xl bg-inherit sticky top-0 left-0 z-20'>다가오는 레이드</div>
      <ul className='flex flex-col gap-3 px-5 pb-5'>
        {data.schedules.map((scheduleId: string) => (
          <RaidList key={scheduleId} scheduleId={scheduleId} />
        ))}
      </ul>
    </div>
  )
}
