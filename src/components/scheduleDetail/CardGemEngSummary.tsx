import { CardsInterface } from '@/types/CardsInterface'
import { EngravingInterface } from '@/types/EngravingInterface'
import { GemsInterface } from '@/types/GemInterface'
import Image from 'next/image'

interface Ownprops {
  ArmoryCard: CardsInterface
  ArmoryEngraving: EngravingInterface
  ArmoryGem: GemsInterface
}

export default function CardGemEngSummary({ ArmoryCard, ArmoryGem, ArmoryEngraving }: Ownprops) {
  let cardEffect = ArmoryCard.Effects[0].Items[ArmoryCard.Effects[0].Items.length - 1].Name
  const { Effects } = ArmoryEngraving

  switch (cardEffect) {
    case '세상을 구하는 빛 6세트 (18각성합계)':
      cardEffect = '세구 18각'
      break
    case '세상을 구하는 빛 6세트 (30각성합계)':
      cardEffect = '세구 30각'
      break
    case '카제로스의 군단장 6세트 (18각성합계)':
      cardEffect = '암구 18각'
      break
    case '카제로스의 군단장 6세트 (30각성합계)':
      cardEffect = '암구 30각'
      break
    default:
      break
  }

  const getGemAvgLevel = () => {
    let sum = 0

    ArmoryGem.Gems.map(g => (sum += g.Level))

    const gemAvg = Math.round((sum / ArmoryGem.Gems.length) * 10) / 10

    return gemAvg
  }

  const getEngraving = () => {
    const formattedEffects: { name: string; level: string; icon: string }[] = []

    // 주어진 배열을 순회하며 각 객체의 이름과 레벨을 추출하여 객체화
    Effects.forEach(effect => {
      const name = effect.Name.split(' Lv. ')[0] // 이름 추출
      const level = effect.Name.split(' Lv. ')[1] // 레벨 추출
      const icon = effect.Icon
      // 추출한 이름과 레벨을 가지고 객체 생성하여 배열에 추가
      formattedEffects.push({ name, level, icon })
    })

    return formattedEffects
  }

  return (
    <>
      <div className='flex flex-col space-y-2'>
        <div className='flex w-full space-x-2 items-center'>
          <div className='border rounded p-1 text-sm font-semibold'>카드</div>
          <div className='text-lg font-semibold'>{cardEffect}</div>
        </div>
        <div className='flex w-full space-x-2 items-center'>
          <div className='border rounded p-1 text-sm font-semibold'>평균 보석 레벨</div>
          <div className='text-lg font-semibold'>{getGemAvgLevel()} 레벨</div>
        </div>
      </div>
      <div className='text-sm font-semibold space-y-2'>
        {getEngraving().map((effect, idx) => (
          <div key={idx} className='flex w-full gap-2 items-center'>
            <Image src={effect.icon} width={28} height={28} alt='각인 이미지' className='rounded-full' />
            <div>{effect.name}</div>
            <div>{effect.level}</div>
          </div>
        ))}
      </div>
    </>
  )
}
