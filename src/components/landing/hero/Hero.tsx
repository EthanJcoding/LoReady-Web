import Link from 'next/link'
import Animation from '../animation/animation'
import DemoAuthButton from '@/components/auth/DemoAuthButton'

export default function Hero() {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center'>
      <section className='max-w-[1600px] flex w-full h-full gap-10 justify-between px-5 py-32 max-sm:px-3 max-lg:py-0'>
        <div className='flex-1 flex flex-col items-left justify-center'>
          <div className='mb-8 font-bold text-4xl max-xl:text-3xl max-lg:text-4xl max-sm:text-3xl'>
            <p className='mb-2'>친구들, 길드원들과</p>
            <p className='mb-4'>레이드 스케줄을 편하게 관리하세요.</p>
            <p className='font-normal text-xl max-xl:text-lg max-lg:text-xl'>
              디스코드에서 레이드 스케줄을 만들고 공유하세요 !
            </p>
          </div>
          <div className='flex items-center gap-4 mb-8 max-sm:gap-3'>
            <div className='flex gap-4 max-sm:gap-3'>
              <Link
                className='text-light bg-primary-accent hover:bg-primary-accent/70 font-medium py-2 px-4 rounded transition'
                href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string}
                target='_blank'
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
