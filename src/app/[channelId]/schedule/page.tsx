import { getChannelData } from '@/api/firebase'
import PartyList from '@/components/partyList/PartyList'
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

  if (!channelData || !isValidMember) return

  return {
    title: `${channelName} 레이드 일정`,
    description: '참여중인 디스코드 서버(로레디봇이 추가된 서버)의 예정된 로스트아크 레이드 일정을 확인할 수 있습니다.'
  }
}

export default async function Schedule({ params: { channelId } }: Ownprops) {
  const data = await getChannelData(channelId)

  if (!data) return

  return (
    <div className='flex flex-wrap gap-5 overflow-x-auto min-w-0'>
      <PartyList channelId={channelId} />
    </div>
  )
}
