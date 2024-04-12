import { getChannelData } from '@/api/firebase'
import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { notFound } from 'next/navigation'
import SignIn from '@/components/auth/SignIn'
import { Metadata } from 'next'
import { validateMember } from '@/utils/validateMember'

interface Ownprops {
  children: React.ReactNode
  params: {
    channelId: string
  }
}

export const metadata: Metadata = {
  title: {
    template: '%s - 로레디',
    default: '로레디'
  }
}

export default async function ChannelLayout({ children, params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const isValidMember = validateMember(session?.user.id, channelData?.memberIds)

  if (!session) return <SignIn />

  if (!channelData || !isValidMember) notFound()

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
