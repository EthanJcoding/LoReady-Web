import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'
import ThemeProvider from '@/components/providers/ThemeProviders'

interface Ownprops {
  children: React.ReactNode
  params: {
    channelId: string
  }
}

export default function ChannelLayout({ children, params }: Ownprops) {
  return (
    <ThemeProvider>
      <div className='h-dvh flex bg-light dark:bg-dark dark:text-light'>
        <SideBar />
        <main className='flex-1 flex flex-col gap-5 p-7 pb-5 overflow-hidden'>
          <ServerName id={params.channelId} />
          <Navigation />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
