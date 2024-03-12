import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center space-y-10'>
      <Link href={'/123/dashboard'}>
        <button className='border p-10 rounded-lg'>대쉬보드 개발 페이지로 이동</button>
      </Link>
      <Link href={'/123/schedule'}>
        <button className='border p-10 rounded-lg'>스케줄 개발 페이지로 이동</button>
      </Link>
    </div>
  )
}
