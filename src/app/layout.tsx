import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'
import { getServerSession } from 'next-auth'
import Toast from '@/components/Toast'
import ThemeProvider from '@/components/providers/ThemeProvider'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard'
})

export const metadata: Metadata = {
  title: '로레디'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang='ko' className='max-sm:text-sm'>
      <body className={`relative ${pretendard.variable} font-pretendard text-[#272727] font-normal`}>
        <ThemeProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  )
}
