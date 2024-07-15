import CharacterSummary from './CharacterSummary'
import ArmoryTab from './ArmoryTab'
import useCharacterStore from '@/stores/characterStore'
import { FaExclamationCircle } from 'react-icons/fa'
interface Ownprops {
  isLoading: boolean
}

export default function CharacterDetail({ isLoading }: Ownprops) {
  const selectedCharacter = useCharacterStore(state => state.selectedCharacter)

  if (selectedCharacter && !isLoading) {
    if (selectedCharacter.data === null) {
      return (
        <section className='flex flex-col border lg:w-2/3 w-full h-full p-8 rounded-lg shadow-sm gap-4 overflow-y-auto text-center justify-center'>
          <h1 className='flex justify-center '>
            <FaExclamationCircle size={80} />
          </h1>
          <h1>
            현재 <span className='font-medium text-xl'>{selectedCharacter.character}</span> 캐릭터 정보를 가져올 수
            없어요.
          </h1>
          <h2>시즌3 업데이트 이후 로레디 참여를 원하는 캐릭터는 해당 캐릭터에 한번은 접속해야 해요.</h2>
        </section>
      )
    } else {
      const { ArmoryEquipment, ArmoryProfile, ArmoryCard, ArmoryEngraving, ArmoryGem } = selectedCharacter.data

      return (
        <section className='flex flex-col border lg:w-2/3 w-full h-full p-8 rounded-lg shadow-sm gap-4 overflow-y-auto'>
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
}
