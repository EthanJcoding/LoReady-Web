import { getChannelData } from '@/api/firebase'
import ServerProfile from '../ServerProfile'

interface Ownprops {
  id: string
}

export default async function ServerName({ id }: Ownprops) {
  //FIXME: 접속 url 확인되면 아래 id값 재할당 삭제
  id = '1050686760373469234'
  const data = await getChannelData(id)

  if (!data) return

  return (
    <div className='pb-4'>
      <ServerProfile name={data.channelName} iconSrc={data.channelIconURL} iconSize={9} fontSize='2xl' />
    </div>
  )
}
