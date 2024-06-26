import Image from 'next/image'
import { GemsInterface } from '@/types/Equipments/gems'

interface Ownprops {
  ArmoryGem: GemsInterface
}

export default function Gem({ ArmoryGem }: Ownprops) {
  if (ArmoryGem === null) {
    return <div>보석이 없어요!</div>
  }

  // hover 이벤트 추가

  return (
    <div className='h-full'>
      <div className='flex justify-between gap-2'>
        {ArmoryGem.Gems.map((gem, idx) => (
          <div
            key={idx}
            className='flex flex-col items-center bg-gradient-to-br from-[#3c2201] to-[#a86200] rounded-lg'
          >
            <Image src={gem.Icon} width={50} height={50} alt='보석' className='' />
            <div className='bg-primary-accent text-white w-full text-center rounded-b-lg'>{gem.Level}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
