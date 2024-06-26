import CharacterSummary from './CharacterSummary'
import ArmoryTab from './ArmoryTab'
import useCharacterStore from '@/stores/characterStore'
import Animation from '@/components/landing/animation/animation'

interface Ownprops {
  isLoading: boolean
}

export default function CharacterDetail({ isLoading }: Ownprops) {
  const selectedCharacter = useCharacterStore(state => state.selectedCharacter)

  if (selectedCharacter && !isLoading) {
    const { ArmoryEquipment, ArmoryProfile, ArmoryCard, ArmoryEngraving, ArmoryGem } = selectedCharacter.data

    return (
      <section className='flex flex-col border sm:w-2/3 w-full h-full p-8 rounded-lg shadow-sm gap-4 overflow-y-auto'>
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
}
