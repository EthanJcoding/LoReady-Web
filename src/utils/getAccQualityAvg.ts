import { ArmoryEquipmentInterface } from '@/types/Equipments/armory'

export const getAccQualityAvg = (accessories: ArmoryEquipmentInterface[]) => {
  let sum = 0

  for (let i = 0; i < accessories.length; i++) {
    sum += JSON.parse(accessories[i].Tooltip).Element_001.value.qualityValue
  }

  return Math.ceil(sum / accessories.length)
}
