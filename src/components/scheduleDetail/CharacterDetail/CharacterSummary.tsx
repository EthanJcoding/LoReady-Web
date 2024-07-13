import Image from 'next/image'
import EquipmentSummary from './EquipmentSummary'
import CardGemEngSummary from './CardGemEngSummary'
import ProfileSummary from './ProfileSummary'
import {
  ArmoryCardsInterface,
  ArmoryEngravingInterface,
  ArmoryEquipmentInterface,
  ArmoryGemInterface,
  ArmoryProfileInterface
} from '@/types/Equipments/armory'

interface Ownprops {
  ArmoryProfile: ArmoryProfileInterface
  ArmoryEquipment: ArmoryEquipmentInterface[]
  ArmoryCard: ArmoryCardsInterface
  ArmoryGem: ArmoryGemInterface
  ArmoryEngraving: ArmoryEngravingInterface
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
              priority={true}
            />
          </div>
          <div className='flex flex-col w-full space-y-4'>
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
