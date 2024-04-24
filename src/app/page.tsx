import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '로레디 - 로스트아크 레이드 일정 관리, 공대 편성',
  description: '디스코드 로레디봇을 통해 만든 레이드를 구성하고 관리할 수 있는 사이트'
}

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center space-y-10'>
      <Link href={'/1050686760373469234/dashboard'}>
        <button className='border p-10 rounded-lg'>대쉬보드 개발 페이지로 이동</button>
      </Link>
      <Link href={'/1050686760373469234/schedule'}>
        <button className='border p-10 rounded-lg'>스케줄 개발 페이지로 이동</button>
      </Link>
    </div>
  )
}
