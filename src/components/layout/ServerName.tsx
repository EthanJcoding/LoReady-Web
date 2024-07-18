import { getChannelData } from '@/api/firebase'
import Image from 'next/image'
import AuthButton from '../auth/AuthButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

interface Ownprops {
  id: string
}

export default async function ServerName({ id }: Ownprops) {
  const session = await getServerSession(authOptions)
  const data = await getChannelData(id)

  if (!data) return

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-2 text-2xl'>
        <span className='flex-none w-9 h-9 rounded-full border overflow-hidden'>
          <Image
            className='w-full h-full object-cover'
            src={data.channelIconURL}
            alt={`${data.channelName} 서버 아이콘`}
            width={100}
            height={100}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg==s'
          />
        </span>
        <span className='truncate'>{data.channelName}</span>
      </div>
      <AuthButton session={session} />
    </div>
  )
}
