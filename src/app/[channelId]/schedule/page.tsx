import { getChannelData } from '@/api/firebase'
import ScheduleLists from '@/components/schedule/ScheduleLists'
import { authOptions } from '@/utils/authOptions'
import { validateMember } from '@/utils/validateMember'
import { getServerSession } from 'next-auth'

interface Ownprops {
  params: {
    channelId: string
  }
}

export async function generateMetadata({ params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const isValidMember = validateMember(session?.user.id, channelData?.memberIds)
  const channelName: string = channelData?.channelName || ''

  if (!isValidMember) return

  return {
    title: `${channelName} - 레이드 일정`,
    description: '참여중인 디스코드 서버(로레디봇이 추가된 서버)의 예정된 로스트아크 레이드 일정을 확인할 수 있습니다.'
  }
}

export default async function Schedule({ params: { channelId } }: Ownprops) {
  //TODO: 필터기능
  return (
    <div className='flex-1 flex flex-col gap-5 pr-3 overflow-y-auto'>
      <div className='flex justify-between'>
        <div>필터(보스 리스트)</div>
        <div>완료된 일정 제외</div>
      </div>
      <div className='flex-1'>
        <ScheduleLists channelId={channelId} />
      </div>
    </div>
  )
}
