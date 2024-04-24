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
        <div className='border rounded p-1 text-sm font-semibold'>세트옵션</div>
        <div className='text-lg font-semibold'>{renderedSetLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>무기</div>
        <div className='text-lg font-semibold'>
          {renderedWeapon} 강 / {weaponQuality} 품질
        </div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>특성합</div>
        <div className='text-lg font-semibold'>{getAccStatSum(accessories)}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>평균 악세 품질</div>
        <div className='text-lg font-semibold'>{accQualityAvg}</div>
      </div>
    </div>
  )
}
