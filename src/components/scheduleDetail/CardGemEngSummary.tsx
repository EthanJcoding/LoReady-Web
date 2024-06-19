import { CardsInterface } from '@/types/Equipments/cards'
import { EngravingInterface } from '@/types/Equipments/engravings'
import { GemsInterface } from '@/types/Equipments/gems'

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
    case '너는 계획이 다 있구나 6세트 (18각성합계)':
      cardEffect = '너계다 18각'
      break
    case '너는 계획이 다 있구나 6세트 (30각성합계)':
      cardEffect = '너계다 30각'
      break
    default:
      break
  }

  const getGemAvgLevel = () => {
    let sum = 0

    if (ArmoryGem) {
      ArmoryGem.Gems.map(g => (sum += g.Level))

      const gemAvg = Math.round((sum / ArmoryGem.Gems.length) * 10) / 10

      return gemAvg + ' 레벨'
    } else return '보석이 없어요'
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
          <div className='border rounded px-1 text-sm font-semibold truncate'>카드</div>
          <div className='2xl:text-lg text-sm font-semibold truncate'>{cardEffect}</div>
        </div>
        <div className='flex w-full space-x-2 items-center'>
          <div className='border rounded px-1 text-sm font-semibold truncate'>평균 보석 레벨</div>
          <div className='2xl:text-lg text-sm font-semibold truncate'>{getGemAvgLevel()}</div>
        </div>
        <div className='flex w-full space-x-2 items-center'>
          <div className='border rounded px-1 text-sm font-semibold truncate'>각인</div>
          <div className='flex gap-1 2xl:text-lg text-sm font-semibold truncate '>
            {getEngraving().map((engrave, idx) => (
              <div key={idx}>{engrave.level}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
