import ServerProfile from '@/components/ServerProfile'
import Link from 'next/link'

interface Ownprops {
  id: string
  name: string
  iconSrc: string
}

export default function ServerList({ id, name, iconSrc }: Ownprops) {
  return (
    <li className='flex opacity-85 hover:opacity-100 transition-opacity'>
      <Link href={`/${id}/dashboard`} className='overflow-hidden'>
        <ServerProfile name={name} iconSrc={iconSrc} iconSize={6} />
      </Link>
    </li>
  )
}
