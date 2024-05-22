import { EquipmentInterface } from '@/types/Equipments/equipments'

interface Result {
  [key: string]: number[]
}

export const getSetOption = (armoryEquipment: EquipmentInterface[]) => {
  const result: Result = {}

  // 정규식 패턴
  const regex = /<[^>]*>/g

  // 아이템별 세트 옵션 추출
  armoryEquipment.forEach(equipment => {
    if (['투구', '어깨', '상의', '하의', '장갑', '무기'].includes(equipment.Type)) {
      const parsedObject = JSON.parse(equipment.Tooltip)

      for (const key in parsedObject) {
        if (parsedObject.hasOwnProperty(key)) {
          const element = parsedObject[key]
          if (element.type === 'ItemPartBox' && element.value.Element_000.includes('세트')) {
            const setOption = element.value.Element_001.replace(regex, '')

            addToResult(result, setOption)
          }
        }
      }
    }
  })

  // 결과 정렬
  const sortedResult: Result = {}
  Object.keys(result)
    .sort()
    .forEach(key => {
      sortedResult[key] = result[key].sort((a, b) => b - a)
    })

  return sortedResult
}

// 결과 객체에 타입이 존재하는지 확인하고 레벨 추가
const addToResult = (result: Result, setOption: string) => {
  const match = setOption.match(/([^\s]+) Lv\.(\d+)/)
  if (match) {
    const type = match[1]
    const level = parseInt(match[2])
    result[type] = result[type] || []
    result[type].push(level)
  }
}
