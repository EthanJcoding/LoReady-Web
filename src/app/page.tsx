import { Metadata } from 'next'
import Header from '@/components/landing/header/Header'
import Hero from '@/components/landing/hero/Hero'

export const metadata: Metadata = {
  title: '로레디 - 로스트아크 레이드 일정 관리, 공대 편성',
  description: '디스코드 로레디봇을 통해 만든 레이드를 구성하고 관리할 수 있는 사이트'
}

export default function Home() {
  return (
    <div className='w-full p-7 space-y-4 h-dvh flex flex-col bg-light dark:bg-dark dark:text-light max-sm:p-5'>
      <Header />
      <Hero />
    </div>
  )
}
