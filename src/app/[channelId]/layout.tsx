import { getChannelData } from '@/api/firebase'
import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { notFound, redirect } from 'next/navigation'
import { validateMember } from '@/utils/validateMember'
import Menu from '@/components/layout/menu/Menu'
import { headers } from 'next/headers'

interface Ownprops {
  children: React.ReactNode
  params: {
    channelId: string
  }
}

export async function generateMetadata({ params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)
  const channelData = await getChannelData(channelId)
  const isValidMember = validateMember(session?.user.id, channelData?.memberIds)

  if (!session) return

  if (!isValidMember)
    return {
      title: 'Not found - 로레디',
      description: '페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.'
    }

  return {
    title: {
      template: '%s - 로레디',
      default: '로레디'
    }
  }
}

export default async function ChannelLayout({ children, params: { channelId } }: Ownprops) {
  const session = await getServerSession(authOptions)

  if (!session) {
    const currentUrl = headers().get('x-pathname') || ''
    redirect(`/login?redirect_url=${encodeURIComponent(currentUrl)}`)
  }

  const channelData = await getChannelData(channelId)
  const isValidMember = validateMember(session.user.id, channelData?.memberIds)

  if (!isValidMember) notFound()

  return (
    <div className='h-dvh flex bg-light dark:bg-dark dark:text-light'>
      <SideBar />
      <Menu />
      <main className='flex-1 flex flex-col gap-5 p-7 pb-5 overflow-hidden max-sm:px-3 max-sm:py-5'>
        <ServerName id={channelId} />
        <Navigation />
        <div className='flex-1 flex w-full h-full max-w-[121rem] overflow-hidden'>{children}</div>
      </main>
    </div>
  )
}
