import { Session, getServerSession } from 'next-auth'
import ServerList from './ServerList'
import { getUserChannels } from '@/api/firebase'
import { authOptions } from '@/utils/authOptions'

export default async function ServerLists() {
  const userData = (await getServerSession(authOptions)) as Session

  const lists = await getUserChannels(userData.user.id)

  return (
    <ul className='flex flex-col gap-3'>
      {lists.map(list => (
        <ServerList key={list.id} id={list.id} name={list.channelName} iconSrc={list.channelIconURL} />
      ))}
    </ul>
  )
}
