'use client'

import ServerProfile from '@/components/ServerProfile'
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
      <Link href={`/${id}/dashboard`} className={`overflow-hidden ${active && 'font-medium text-primary-accent'}`}>
        <ServerProfile name={name} iconSrc={iconSrc} iconSize={6} />
      </Link>
    </li>
  )
}
