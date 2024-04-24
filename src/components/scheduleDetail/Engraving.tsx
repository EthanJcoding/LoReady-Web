import { EngravingInterface } from '@/types/EngravingInterface'
import Image from 'next/image'

interface Ownprops {
  ArmoryEngraving: EngravingInterface
}

export default function Engraving({ ArmoryEngraving }: Ownprops) {
  const { Effects } = ArmoryEngraving

  return (
    <div className='flex justify-between w-full '>
      {Effects.map((effect, idx) => {
        return (
          <div key={idx} className='flex flex-col justify-center space-y-2 w-full items-center'>
            <Image src={effect.Icon} width={100} height={100} alt='각인 이미지' className='rounded-full w-12' />

            <div className='text-xs truncate'>{effect.Name}</div>
          </div>
        )
      })}
    </div>
  )
}
