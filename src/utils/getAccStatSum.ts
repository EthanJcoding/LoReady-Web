import { ArmoryEquipmentInterface } from '@/types/Equipments/armory'

export const getAccStatSum = (accessories: ArmoryEquipmentInterface[]) => {
  let sum = 0

  for (let i = 0; i < accessories.length; i++) {
    const parsedObject = JSON.parse(accessories[i].Tooltip)
    const match = parsedObject.Element_005.value.Element_001.match(/\b\d+\b/)
    const extractedNumber = match ? match[0] : null

    if (accessories[i].Type === '목걸이') {
      const [num, neck] = parsedObject.Element_005.value.Element_001.match(/\d+/g)

      sum += Number(num)
      sum += Number(neck)
    } else {
      sum += Number(extractedNumber)
    }
  }

  return sum
}
