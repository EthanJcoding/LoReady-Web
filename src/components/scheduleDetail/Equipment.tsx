import { EquipmentInterface } from '@/types/EquipmentInterface'
import { StoneObjectInterface } from '@/types/EquipmentInterface'
import { getBraceletAbility } from '@/utils/getBraceletAbility'
import { getElixir } from '@/utils/getElixir'
import Image from 'next/image'
import { getEquipmentAndAccessories } from '@/utils/getEquipmentAndAccessories'

interface Ownprops {
  ArmoryEquipment: EquipmentInterface[]
}

export default function Equipment({ ArmoryEquipment }: Ownprops) {
  const { accessories, equipments, braceletAndStone } = getEquipmentAndAccessories(ArmoryEquipment)
  const getEquipmentGrade = (grade: string) => {
    switch (grade) {
      case '고대':
        return 'bg-gradient-to-br from-[#3d3325] to-[#dcc999]'
      case '유물':
        return 'bg-gradient-to-br from-[#341a09] to-[#a24006]'
      default:
        return ''
    }
  }

  const getQualityColor = (q: number) => {
    if (q === -1) {
      return 'hidden'
    }

    if (q === 100) {
      return 'bg-[#ea6811]'
    }
    if (q >= 90) {
      return 'bg-[#df18e3]'
    }
    if (q >= 70) {
      return 'bg-[#1260eb]'
    } else return 'bg-[#09ae09]'
  }

  const getAbilityStone = (stoneObject: StoneObjectInterface) => {
    const { Element_000, Element_001, Element_002 } = stoneObject

    const stones = [Element_000, Element_001, Element_002]

    const regexString = /<FONT COLOR='#(?:FE2E2E|FFFFAC)'>(.*?)<\/FONT>/

    const regexNumber = /\+(\d+)/

    return (
      <div className='flex flex-wrap gap-2 '>
        {stones.map((stone, idx) => {
          const value = stone.contentStr.match(regexNumber)
          const match = stone.contentStr.match(regexString)

          return (
            <div key={idx} className='text-xs font-medium border p-0.5 rounded'>
              {match && match[1]} {value && value[0]}
            </div>
          )
        })}
      </div>
    )
  }

  const extractEnhanceValue = (str: string) => {
    const regex = /\+\d+/
    const match = str.match(regex)
    return match ? match[0] : null
  }

  return (
    <div className='flex w-full justify-between gap-8'>
      <div className='space-y-2 w-full'>
        {equipments.map((equipment, idx) => {
          const parsedObject = JSON.parse(equipment.Tooltip)
          const quality = parsedObject.Element_001.value.qualityValue
          const elixirArr: string[] = []

          if (equipment.Type !== '무기') {
            // only 엘릭서
            let elixirJson = parsedObject.Element_008.value.Element_000?.contentStr

            // parsedObject의 길이가 다른 경우 (초월 + 상재 때문에 Element의 수가 더 많은 경우)
            if (elixirJson === undefined) {
              elixirJson = parsedObject.Element_010.value.Element_000.contentStr
            }

            getElixir(elixirJson).map(el => {
              elixirArr.push(el)
            })
          }

          return (
            <div key={idx} className='flex gap-2'>
              <div className={getEquipmentGrade(equipment.Grade) + ` rounded min-w-[38px] max-h-[38px] p-0.5`}>
                <Image src={equipment.Icon} width={38} height={38} alt='장비 이미지' className='w-full' />
              </div>
              <div className='flex flex-col '>
                <div className='text-sm truncate font-medium'>
                  {extractEnhanceValue(equipment.Name) + ' ' + equipment.Type}
                </div>
                <div className='flex items-center'>
                  <div
                    className={
                      getQualityColor(quality) + ` text-white text-center rounded text-xs min-w-[2rem] font-medium `
                    }
                  >
                    {quality}
                  </div>
                </div>
              </div>
              <div className='flex flex-col '>
                {elixirArr.map((el, idx) => {
                  return (
                    <div key={idx} className='text-xs font-medium border px-1 rounded truncate'>
                      {el}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className='space-y-2 w-full'>
        {accessories.map((equipment, idx) => {
          const parsedObject = JSON.parse(equipment.Tooltip)

          const quality = parsedObject.Element_001.value.qualityValue

          let accessoryStat = [parsedObject.Element_005.value.Element_001]

          if (equipment.Type === '목걸이') {
            accessoryStat = accessoryStat[0].split('<BR>')
          }

          return (
            <div key={idx} className='flex gap-2'>
              <div className={getEquipmentGrade(equipment.Grade) + ` rounded min-w-[38px] max-h-[38px] p-0.5`}>
                <Image src={equipment.Icon} width={38} height={38} alt='악세 이미지' className='w-full' />
              </div>
              <div className='flex flex-col'>
                <div className='text-sm truncate font-medium'>{equipment.Type}</div>
                <div className='flex items-center'>
                  <div
                    className={
                      getQualityColor(quality) + `  text-white text-center rounded text-xs min-w-[2rem] font-medium`
                    }
                  >
                    {quality}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                {accessoryStat.map((stat, idx) => {
                  return (
                    <div key={idx} className='text-xs font-medium border px-1 rounded truncate min-w-[64px]'>
                      {stat}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className='space-y-2 w-full'>
        {braceletAndStone.map((equipment, idx) => {
          const parsedObject = JSON.parse(equipment.Tooltip)

          const abilityStone = parsedObject.Element_006.value.Element_000?.contentStr
          const braceletJson = parsedObject.Element_004.value.Element_001

          if (equipment.Type === '팔찌') {
            const bracelet = getBraceletAbility(braceletJson)

            return (
              <div key={idx} className='flex gap-2'>
                <div className={getEquipmentGrade(equipment.Grade) + ` rounded min-w-[42px] max-h-[42px]`}>
                  <Image src={equipment.Icon} width={38} height={38} alt='장비 이미지' className='w-full' />
                </div>
                <div className='flex flex-col'>
                  <div className='text-sm truncate font-medium'>{equipment.Name}</div>
                  <div className='flex flex-wrap gap-2'>
                    {bracelet.map((el, idx) => {
                      return (
                        <div key={idx} className='text-xs font-medium border p-0.5 rounded'>
                          {el}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div key={idx} className='flex gap-2 '>
              <div className={getEquipmentGrade(equipment.Grade) + ` rounded min-w-[42px] max-h-[42px]`}>
                <Image src={equipment.Icon} width={42} height={42} alt='악세 이미지' className='w-full' />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-sm truncate font-medium'>{equipment.Type}</div>
                <>{getAbilityStone(abilityStone)}</>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
