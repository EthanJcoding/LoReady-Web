import Navigation from '@/components/layout/Navigation'
import ServerName from '@/components/layout/ServerName'
import SideBar from '@/components/layout/sidebar/SideBar'

export default function ChannelLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`h-dvh flex bg-[#f8fafb]`}>
      <SideBar />
      <main className='flex-1 flex flex-col gap-5 p-7 pb-5'>
        <ServerName />
        <Navigation />
        {children}
      </main>
    </div>
  )
}
