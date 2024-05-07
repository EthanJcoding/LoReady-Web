import { EquipmentInterface } from '@/types/EquipmentInterface'
import { getAccQualityAvg } from '@/utils/getAccQualityAvg'
import { getAccStatSum } from '@/utils/getAccStatSum'
import { getEquipmentAndAccessories } from '@/utils/getEquipmentAndAccessories'
import { getSetOption } from '@/utils/getSetOption'

interface Ownprops {
  ArmoryEquipment: EquipmentInterface[]
}

export default function EquipmentSummary({ ArmoryEquipment }: Ownprops) {
  const setOption = getSetOption(ArmoryEquipment)

  const renderedSetLevel = Object.entries(setOption)
    .map(([key, value]) => {
      const optionString = `${key} ${value.join('')}`
      return optionString
    })
    .join(' / ')

  const [weapon] = ArmoryEquipment.filter(equipment => equipment.Type === '무기')
  const renderedWeapon = weapon.Name.match(/\b\d+\b/)
  const parsedObject = JSON.parse(weapon.Tooltip)
  const weaponQuality = parsedObject.Element_001.value.qualityValue

  const { accessories } = getEquipmentAndAccessories(ArmoryEquipment)

  const accQualityAvg = getAccQualityAvg(accessories)

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>세트옵션</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>{renderedSetLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>무기</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>
          {renderedWeapon} 강 / {weaponQuality} 품질
        </div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>특성합</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>{getAccStatSum(accessories)}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>평균 악세 품질</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>{accQualityAvg}</div>
      </div>
    </div>
  )
}
