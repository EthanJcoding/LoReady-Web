import Image from 'next/image'
import Link from 'next/link'

export default function ServerList() {
  return (
    <li className='flex opacity-85 hover:opacity-100 transition-opacity'>
      <Link href={'/1/dashboard'} className='flex items-center gap-2 overflow-hidden'>
        <span className='flex-none w-6 h-6 rounded-full border overflow-hidden'>
          <Image
            className='w-full h-full object-cover'
            src={'https://cdn.discordapp.com/icons/1209059689657016371/0f0a953c0d6c76e50b88304b1b00032e'}
            alt='서버 아이콘'
            width={100}
            height={100}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg==s'
          ></Image>
        </span>
        <span className='truncate'>올바른취업생활올바른취업생활올바른취업생활</span>
      </Link>
    </li>
  )
}
