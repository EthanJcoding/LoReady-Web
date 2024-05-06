import { EquipmentInterface } from '@/types/EquipmentInterface'
import { ProfileInterface } from '@/types/ProfileInterface'
import Image from 'next/image'
import EquipmentSummary from './EquipmentSummary'
import { CardsInterface } from '@/types/CardsInterface'
import CardGemSummary from './CardGemSummary'
import { GemsInterface } from '@/types/GemInterface'
import { EngravingInterface } from '@/types/EngravingInterface'
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
    <div className='w-full h-full flex flex-col space-y-4'>
      <h1 className='font-semibold 2xl:text-2xl text-xl border-b '>요약</h1>
      <div className='flex gap-8 w-full h-full'>
        <div className='flex gap-4 w-full h-auto'>
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
            <div className='flex flex-wrap w-full gap-8'>
              <ProfileSummary ArmoryProfile={ArmoryProfile} />
              <EquipmentSummary ArmoryEquipment={ArmoryEquipment} />
              <CardGemSummary ArmoryCard={ArmoryCard} ArmoryGem={ArmoryGem} ArmoryEngraving={ArmoryEngraving} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
