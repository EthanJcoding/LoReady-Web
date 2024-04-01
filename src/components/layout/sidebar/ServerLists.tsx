'use client'

import { useSession } from 'next-auth/react'
import ServerList from './ServerList'
import { useEffect, useState } from 'react'
import { Channel } from '@/types/channel'
import { getUserChannels } from '@/api/firebase/getUserChannels/getUserChannels'

export default function ServerLists() {
  const [lists, setLists] = useState<Channel[]>([])
  const { data } = useSession()
  const userId: string = data?.user.id

  useEffect(() => {
    if (userId) {
      getUserChannels(userId)
        .then(data => setLists([...lists, ...data]))
        .catch(error => console.log(error))
    }
  }, [userId])

  return (
    <ul className='flex flex-col gap-3'>
      {lists.map(list => (
        <ServerList key={list.id} id={list.id} name={list.channelName} iconSrc={list.channelIconURL} />
      ))}
    </ul>
  )
}
