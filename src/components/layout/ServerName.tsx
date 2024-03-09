import { getChannelData } from '@/api/firebase'
import Image from 'next/image'

interface Ownprops {
  id: string
}

export default async function ServerName({ id }: Ownprops) {
  //FIXME: 접속 url 확인되면 아래 id값 재할당 삭제
  id = '1050686760373469234'
  const data = await getChannelData(id)

  if (!data) return

  return (
    <div className='flex items-center gap-2 pb-4 text-2xl'>
      <span className='flex-none w-9 h-9 rounded-full border overflow-hidden'>
        <Image
          className='w-full h-full object-cover'
          src={data.channelIconURL}
          alt={`${data.channelName} 서버 아이콘`}
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg==s'
        ></Image>
      </span>
      <span className='truncate'>{data.channelName}</span>
    </div>
  )
}
