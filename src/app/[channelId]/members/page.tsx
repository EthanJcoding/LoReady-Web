import { getChannelData, getUserData } from '@/api/firebase'
import MemberCard from '@/components/members/MemberCard'
import { Channel } from '@/types/channel'
import { User } from '@/types/users'
import { authOptions } from '@/utils/authOptions'
import { validateMember } from '@/utils/validateMember'
import { Session, getServerSession } from 'next-auth'

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
    title: `${channelName} - 채널 맴버`,
    description:
      '참여중인 디스코드 서버(로레디봇이 추가된 서버)의 다가오는 로스트아크 레이드와 로스트아크 이번 주 도전 정보를 확인할 수 있습니다.'
  }
}

export default async function Members({ params: { channelId } }: Ownprops) {
  const { memberIds } = (await getChannelData(channelId)) as Channel
  const session = (await getServerSession(authOptions)) as Session

  const members = []

  for (let i = 0; i < memberIds.length; i++) {
    const user = (await getUserData(memberIds[i])) as User

    members.push(user)
  }

  return (
    <div className='flex-1 flex gap-5 overflow-hidden'>
      <MemberCard members={members} session={session} />
    </div>
  )
}
