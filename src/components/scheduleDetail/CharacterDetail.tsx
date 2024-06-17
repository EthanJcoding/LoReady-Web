import { Character } from '@/types/raid'
import CharacterSummary from './CharacterSummary'
import ArmoryTab from './ArmoryTab'

interface Ownprops {
  selectedCharacter: Character
}

export default function CharacterDetail({ selectedCharacter }: Ownprops) {
  const { ArmoryEquipment, ArmoryProfile, ArmoryCard, ArmoryEngraving, ArmoryGem } = selectedCharacter.data

  return (
    <section className='flex flex-col border sm:w-2/3 w-full h-full p-8 rounded-lg shadow-sm gap-4 overflow-y-scroll'>
      <CharacterSummary
        ArmoryProfile={ArmoryProfile}
        ArmoryEquipment={ArmoryEquipment}
        ArmoryCard={ArmoryCard}
        ArmoryGem={ArmoryGem}
        ArmoryEngraving={ArmoryEngraving}
      />
      <ArmoryTab
        ArmoryEquipment={ArmoryEquipment}
        ArmoryCard={ArmoryCard}
        ArmoryGem={ArmoryGem}
        ArmoryEngraving={ArmoryEngraving}
      />
    </section>
  )
}
