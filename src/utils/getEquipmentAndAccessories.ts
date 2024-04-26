import { EquipmentInterface } from '@/types/EquipmentInterface'

export const getEquipmentAndAccessories = (ArmoryEquipment: EquipmentInterface[]) => {
  const equipments = []
  const accessories = []
  const braceletAndStone = []

  for (let i = 0; i < ArmoryEquipment.length; i++) {
    const equipment = ArmoryEquipment[i]

    if (['투구', '어깨', '상의', '하의', '장갑', '무기'].includes(equipment.Type)) {
      equipments.push(equipment)
    } else if (['목걸이', '귀걸이', '반지'].includes(equipment.Type)) {
      accessories.push(equipment)
    } else if (['팔찌', '어빌리티 스톤'].includes(equipment.Type)) {
      braceletAndStone.push(equipment)
    }
  }

  return { equipments, accessories, braceletAndStone }
}
