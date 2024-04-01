import { getChannelData } from '@/api/firebase'
import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

interface Ownprops {
  children: React.ReactNode
  params: {
    channelId: string
  }
}

export default async function ChannelLayout({ children, params: { channelId } }: Ownprops) {
  const channelData = await getChannelData(channelId)
  const session = await getServerSession(authOptions)

  if (!channelData) return <div>유효하지 않은 서버입니다.</div>

  if (!session) return <div>로그인 해주세요.</div>

  const channelMembers: string[] = channelData.memberIds
  const userId: string = session.user.id
  const isInChannel = channelMembers.includes(userId)

  if (!isInChannel) return <div>서버에 참여하고 있지 않아요.</div>

  return (
    <ThemeProvider>
      <div className='h-dvh flex bg-light dark:bg-dark dark:text-light'>
        <SideBar />
        <main className='flex-1 flex flex-col gap-5 p-7 pb-5 overflow-hidden'>
          <ServerName id={channelId} />
          <Navigation />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
