import { EquipmentInterface } from '@/types/Equipments/equipments'
import { ProfileInterface } from '@/types/gameProfile'
import Image from 'next/image'
import EquipmentSummary from './EquipmentSummary'
import { CardsInterface } from '@/types/Equipments/cards'
import CardGemEngSummary from './CardGemEngSummary'
import { GemsInterface } from '@/types/Equipments/gems'
import { EngravingInterface } from '@/types/Equipments/engravings'
import ProfileSummary from './ProfileSummary'

interface Ownprops {
  ArmoryProfile: ProfileInterface
  ArmoryEquipment: EquipmentInterface[]
  ArmoryCard: CardsInterface
  ArmoryGem: GemsInterface
  ArmoryEngraving: EngravingInterface
}

export default function CharacterSummary({
  ArmoryProfile,
  ArmoryEquipment,
  ArmoryCard,
  ArmoryGem,
  ArmoryEngraving
}: Ownprops) {
  return (
    <div className='w-full h-max flex flex-col space-y-4'>
      <h1 className='font-semibold 2xl:text-2xl text-xl border-b '>요약</h1>
      <div className='flex space-x-8 w-full h-full'>
        <div className='flex gap-4 w-full h-full'>
          <div className='flex'>
            <Image
              src={ArmoryProfile.CharacterImage}
              width={200}
              height={200}
              alt='캐릭터 프로필사진'
              className='rounded w-[150px] h-[250px] object-cover flex-none aspect-[3/4]'
              priority
            />
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-wrap w-full gap-4'>
              <ProfileSummary ArmoryProfile={ArmoryProfile} />
              <EquipmentSummary ArmoryEquipment={ArmoryEquipment} />
              <CardGemEngSummary ArmoryCard={ArmoryCard} ArmoryGem={ArmoryGem} ArmoryEngraving={ArmoryEngraving} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
