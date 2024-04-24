import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found - 로레디',
  description: '페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.'
}

export default function NotFound() {
  return (
    <div className='h-dvh flex flex-col justify-center items-center gap-4 bg-light text-base'>
      <p className='text-3xl font-medium text-neutral-600'>페이지를 찾을 수 없습니다.</p>
      <p className='text-primary-gray'>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
      <Link
        href='/'
        className='px-5 py-2 bg-primary-accent/90 text-light font-medium rounded-3xl hover:bg-primary-accent/100 transition-colors'
      >
        홈으로 이동
      </Link>
    </div>
  )
}
