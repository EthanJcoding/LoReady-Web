import { getChannelData } from '@/api/firebase'
import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { notFound } from 'next/navigation'
import SignIn from '@/components/auth/SignIn'

interface Ownprops {
  children: React.ReactNode
  params: {
    channelId: string
  }
}

export default async function ChannelLayout({ children, params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const channelMembers: string[] = channelData?.memberIds || []
  const userId: string | undefined = session?.user?.id
  const isInChannel = !!userId && channelMembers.includes(userId)

  if (!session) return <SignIn />

  if (!channelData || !isInChannel) notFound()

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
