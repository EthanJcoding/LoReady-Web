import { ArmoryGemInterface } from '@/types/Equipments/armory'
import Image from 'next/image'

interface Ownprops {
  ArmoryGem: ArmoryGemInterface
}

export default function Gem({ ArmoryGem }: Ownprops) {
  if (ArmoryGem === null) {
    return <div>보석이 없어요!</div>
  }

  const getGemGrade = (grade: string) => {
    switch (grade) {
      case '고대':
        return 'bg-gradient-to-br from-[#3d3325] to-[#dcc999]'
      case '유물':
        return 'bg-gradient-to-br from-[#341a09] to-[#a24006]'
      case '전설':
        return 'bg-gradient-to-br from-[#341a09] to-[#a24006]'
      case '에스더':
        return 'bg-gradient-to-br from-[#0c2e2c] to-[#2faba8]'
      default:
        return ''
    }
  }

  return (
    <div className='h-full'>
      <div className='flex justify-between gap-2'>
        {ArmoryGem.Gems.map((gem, idx) => (
          <div key={idx} className={`flex flex-col items-center rounded-lg ${getGemGrade(gem.Grade)}`}>
            <Image src={gem.Icon} width={50} height={50} alt='보석' className='' />
            <div className='bg-primary-accent text-white w-full text-center rounded-b-lg'>{gem.Level}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
