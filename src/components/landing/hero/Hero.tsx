import Link from 'next/link'
import Animation from '../animation/animation'
import DemoAuthButton from '@/components/auth/DemoAuthButton'

export default function Hero() {
  return (
    <main className='w-full h-full flex flex-col sm:p-32 p-8'>
      <section className='flex flex-col sm:flex-row w-full h-full gap-10'>
        <div className='flex flex-col items-left justify-center h-full w-full'>
          <h1 className='sm:text-4xl font-bold mb-4 sm:w-max w-full text-xl'>
            친구들, 길드원들과 <div className='mb-2' /> 레이드 스케줄을 편하게 관리하세요
          </h1>
          <p className='sm:text-xl mb-8'>디스코드에서 레이드 스케줄을 만들고 공유하세요 !</p>
          <div className='flex items-center gap-4 mb-8'>
            <div className='flex gap-4'>
              <Link
                className='text-light bg-primary-accent hover:bg-primary-accent/70 font-medium py-2 px-4 rounded transition'
                href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string}
              >
                사용법
              </Link>
              <Link
                className='text-light bg-primary-accent hover:bg-primary-accent/70 font-medium py-2 px-4 rounded transition'
                href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}
              >
                봇 추가하기
              </Link>
            </div>
            <DemoAuthButton />
          </div>
        </div>
        <Animation />
      </section>
    </main>
  )
}
