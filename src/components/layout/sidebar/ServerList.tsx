'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Ownprops {
  id: string
  name: string
  iconSrc: string
}

export default function ServerList({ id, name, iconSrc }: Ownprops) {
  const { channelId } = useParams()
  const active = channelId === id

  return (
    <li className={`flex ${active ? 'opacity-100' : 'opacity-80'} hover:opacity-100 transition-opacity`}>
      <Link
        href={`/${id}/dashboard`}
        className={`flex items-center gap-2 overflow-hidden ${active && 'font-medium text-primary-accent'}`}
      >
        <span className='flex-none w-6 h-6 rounded-full border overflow-hidden'>
          <Image
            className='w-full h-full object-cover'
            src={iconSrc}
            alt={`${name} 서버 아이콘`}
            width={100}
            height={100}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg==s'
          />
        </span>
        <span className='truncate'>{name}</span>
      </Link>
    </li>
  )
}
