import { getChannelData } from '@/api/firebase'

export default async function Dashboard({ params }: { params: { channelId: string } }) {
  const { channelId } = params

  // 올바른 취업생활의 채널 Id = '1050686760373469234'
  const data = await getChannelData('1050686760373469234')

  console.log(data)
  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <div className='card basis-1/3 bg-secondary-accent/50 dark:bg-primary-accent/80'>
        <div className='pb-4 text-xl'>다가오는 레이드</div>
        <div className='flex flex-col gap-3'></div>
      </div>
      <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-5'>
        <div className='card'>1</div>
        <div className='card'>2</div>
        <div className='card'>3</div>
        <div className='card'>4</div>
      </div>
    </div>
  )
}
