import Image from 'next/image'

interface Ownprops {
  name: string
  iconSrc: string
  iconSize: number
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
}

export default function ServerProfile({ name, iconSrc, iconSize, fontSize = 'base' }: Ownprops) {
  return (
    <div className={`flex items-center gap-2 text-${fontSize}`}>
      <span className={`flex-none w-${iconSize} h-${iconSize} rounded-full border overflow-hidden`}>
        <Image
          className='w-full h-full object-cover'
          src={iconSrc}
          alt={`${name} 서버 아이콘`}
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg==s'
        ></Image>
      </span>
      <span className='truncate'>{name}</span>
    </div>
  )
}
