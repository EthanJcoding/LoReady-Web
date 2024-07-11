import { EquipmentInterface, ToolTipIndentStringGroup, ToolTipObject } from '@/types/Equipments/equipments'
import { StoneObjectInterface } from '@/types/Equipments/equipments'
import { getBraceletAbility } from '@/utils/getBraceletAbility'
import { getElixir } from '@/utils/getElixir'
import Image from 'next/image'
import { getEquipmentAndAccessories } from '@/utils/getEquipmentAndAccessories'

interface Ownprops {
  ArmoryEquipment: EquipmentInterface[]
}
interface UpgradeContent {
  type: string
  elixir: { [key: string]: any } | ''
  transcendence: { [key: string]: any } | ''
  advancedRefining: { [key: string]: any } | ''
  esther: any
}

function extractLevel(htmlString: string) {
  const noTags = htmlString.replace(/<\/?[^>]+(>|$)/g, '')
  const match = noTags.match(/\d+/)
  return match ? match[0] : ''
}

function extractTextWithRegex(htmlString: string) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, '').trim()
}

const EquipmentIcon = ({ grade, iconSrc }: { grade: string; iconSrc: string }) => (
  <div className={`${getEquipmentGrade(grade)} rounded min-w-[36px] max-h-[36px]`}>
    <Image src={iconSrc} width={36} height={36} alt='장비 이미지' className='w-[36px] h-[36px]' priority={true} />
  </div>
)

const getEquipmentGrade = (grade: string) => {
  switch (grade) {
    case '고대':
      return 'bg-gradient-to-br from-[#3d3325] to-[#dcc999]'
    case '유물':
      return 'bg-gradient-to-br from-[#341a09] to-[#a24006]'
    case '에스더':
      return 'bg-gradient-to-br from-[#0c2e2c] to-[#2faba8]'
    default:
      return ''
  }
}

const getQualityColor = (q: number) => {
  if (q === -1) return 'hidden'
  if (q === 100) return 'bg-[#ea6811]'
  if (q >= 90) return 'bg-[#df18e3]'
  if (q >= 70) return 'bg-[#1260eb]'
  return 'bg-[#09ae09]'
}

const AbilityStone = ({ stoneObject }: { stoneObject: StoneObjectInterface }) => {
  if (!stoneObject) return <div>돌이없어용</div>

  const { Element_000, Element_001, Element_002 } = stoneObject
  const stones = [Element_000, Element_001, Element_002]

  const regexString = /<FONT COLOR='#(?:FE2E2E|FFFFAC)'>(.*?)<\/FONT>/
  const regexNumber = /\+(\d+)/

  return (
    <div className='flex flex-wrap gap-2'>
      {stones.map((stone, idx) => {
        const value = stone.contentStr.match(regexNumber)
        const match = stone.contentStr.match(regexString)

        return (
          <div key={idx} className='text-xs font-medium border rounded px-1 truncate'>
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

const EquipmentDetails = ({ equipment }: { equipment: EquipmentInterface }) => {
  const parsedObject = JSON.parse(equipment.Tooltip)
  const quality = parsedObject.Element_001.value.qualityValue
  const upgradeContent: UpgradeContent = {
    type: equipment.Type,
    elixir: '',
    transcendence: '',
    advancedRefining: '',
    esther: ''
  }
  const elixirArr: string[] = []
  let 상급재련 = ''
  let 초월 = ''
  let 엘라 = ''

  for (const key in parsedObject) {
    if (parsedObject[key].type === 'IndentStringGroup' && parsedObject[key].value !== null) {
      if (parsedObject[key].value.Element_000.topStr.includes('엘릭서')) {
        upgradeContent.elixir = parsedObject[key].value
      }
      if (parsedObject[key].value.Element_000.topStr.includes('초월')) {
        upgradeContent.transcendence = parsedObject[key].value
      }
      if (parsedObject[key].value.Element_000.topStr.includes('에스더')) {
        upgradeContent.esther = parsedObject[key].value
      }
    }
    if (parsedObject[key].type === 'SingleTextBox') {
      if (parsedObject[key].value.includes('[상급 재련]')) {
        upgradeContent.advancedRefining = parsedObject[key]
      }
    }
  }

  if (equipment.Type === '무기' && equipment.Grade === '에스더') {
    엘라 = extractTextWithRegex(upgradeContent.esther.Element_000.contentStr.Element_000.contentStr)
  }

  if (upgradeContent.elixir !== '' && equipment.Type !== '무기') {
    let elixirJson = upgradeContent.elixir.Element_000?.contentStr
    getElixir(elixirJson).map(el => elixirArr.push(el))
  }

  if (upgradeContent.advancedRefining !== '') {
    상급재련 = extractLevel(upgradeContent.advancedRefining.value)
  }

  if (upgradeContent.transcendence !== '') {
    초월 = extractLevel(upgradeContent.transcendence.Element_000.topStr)
  }

  return (
    <div className='flex gap-2'>
      <EquipmentIcon grade={equipment.Grade} iconSrc={equipment.Icon} />
      <div className='flex flex-col w-full'>
        <div className='text-sm truncate font-medium flex w-full gap-2 items-center'>
          <div className={equipment.Grade === '에스더' ? 'dark:text-[#3CF2E6] text-[#1AB9B6]' : ''}>
            {extractEnhanceValue(equipment.Name) + ' ' + equipment.Type}
          </div>
          {상급재련 && <div className='text-[#d95959] underline underline-offset-2'>{'x' + 상급재련}</div>}
          {엘라 && <div className='dark:text-[#3CF2E6] text-[#1AB9B6] text-xs font-medium'>{엘라}</div>}
        </div>
        <div className='flex items-center gap-2'>
          <div
            className={`${getQualityColor(quality)} text-white text-center rounded text-xs min-w-[2rem] font-medium`}
          >
            {quality}
          </div>
          {초월 && <div className='text-[#997B3B] dark:text-[#EDDAB3] text-xs '>초월 Lv.{초월}</div>}
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        {elixirArr.map((el, idx) => (
          <div key={idx} className='text-xs font-medium border rounded px-1 truncate'>
            {el}
          </div>
        ))}
      </div>
    </div>
  )
}

const AccessoryDetails = ({ equipment }: { equipment: EquipmentInterface }) => {
  const parsedObject = JSON.parse(equipment.Tooltip)
  const quality = parsedObject.Element_001.value.qualityValue
  let accessoryStat = [parsedObject.Element_005.value.Element_001]

  if (equipment.Type === '목걸이') {
    accessoryStat = accessoryStat[0].split('<BR>')
  }

  return (
    <div className='flex gap-2'>
      <EquipmentIcon grade={equipment.Grade} iconSrc={equipment.Icon} />
      <div className='flex flex-col w-full'>
        <div className='text-sm truncate font-medium'>{equipment.Type}</div>
        <div className='flex items-center'>
          <div
            className={`${getQualityColor(quality)} text-white text-center rounded text-xs min-w-[2rem] font-medium`}
          >
            {quality}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        {accessoryStat.map((stat, idx) => (
          <div key={idx} className='text-xs font-medium border px-1 rounded truncate min-w-[64px]'>
            {stat}
          </div>
        ))}
      </div>
    </div>
  )
}

const BraceletAndStoneDetails = ({ equipment }: { equipment: EquipmentInterface }) => {
  const parsedObject: ToolTipObject = JSON.parse(equipment.Tooltip)

  function isIndentStringGroup(value: any): value is ToolTipIndentStringGroup {
    return value && typeof value === 'object' && 'Element_000' in value
  }

  const getAbilityStone = (parsedObject: ToolTipObject) => {
    for (const item of Object.values(parsedObject)) {
      if (item.type === 'IndentStringGroup' && isIndentStringGroup(item.value)) {
        if (item.value.Element_000.topStr.includes('무작위 각인 효과')) {
          return item.value.Element_000.contentStr as StoneObjectInterface
        }
      }
    }
    return null
  }

  const renderAbilityStone = () => {
    const abilityStone = getAbilityStone(parsedObject) as StoneObjectInterface

    return <AbilityStone stoneObject={abilityStone} />
  }

  const renderBracelet = () => {
    const bracelet = getBraceletAbility(equipment)
    return (
      <div className='flex flex-wrap gap-2'>
        {bracelet?.map((el, idx) => (
          <div key={idx} className='text-xs font-medium border rounded px-1 truncate'>
            <span>{el}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex gap-2'>
      <EquipmentIcon grade={equipment.Grade} iconSrc={equipment.Icon} />
      <div className='flex flex-col'>
        <div className='text-sm truncate font-medium'>
          {equipment.Type === '팔찌' ? equipment.Name : equipment.Type}
        </div>
        {equipment.Type === '팔찌' ? renderBracelet() : renderAbilityStone()}
      </div>
    </div>
  )
}

export default function Equipment({ ArmoryEquipment }: Ownprops) {
  const { accessories, equipments, braceletAndStone } = getEquipmentAndAccessories(ArmoryEquipment)

  return (
    <div className='flex flex-wrap w-full h-full gap-4 justify-between'>
      <div className='space-y-2 w-[16rem]'>
        {equipments.map((equipment, idx) => (
          <EquipmentDetails key={idx} equipment={equipment} />
        ))}
      </div>
      <div className='space-y-2 w-[16rem]'>
        {accessories.map((equipment, idx) => (
          <AccessoryDetails key={idx} equipment={equipment} />
        ))}
      </div>
      <div className='space-y-2 w-max'>
        {braceletAndStone.map((equipment, idx) => (
          <BraceletAndStoneDetails key={idx} equipment={equipment} />
        ))}
      </div>
    </div>
  )
}
