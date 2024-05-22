'use client'

import { useState } from 'react'
import { CardsInterface } from '@/types/Equipments/cards'
import { EquipmentInterface } from '@/types/Equipments/equipments'
import { GemsInterface } from '@/types/Equipments/gems'
import Equipment from './Equipment'
import Card from './Card'
import Gem from './Gem'
import Engraving from './Engraving'

interface Ownprops {
  ArmoryEquipment: EquipmentInterface[]
  ArmoryCard: CardsInterface
  ArmoryGem: GemsInterface
  ArmoryEngraving: any
}

export default function ArmoryTab({ ArmoryEquipment, ArmoryCard, ArmoryGem, ArmoryEngraving }: Ownprops) {
  const [tab, setTab] = useState('장비')

  const tabArray = ['장비', '카드', '보석', '각인']

  const isActiveTab = (t: string) => {
    if (t === tab) {
      return 'text-primary-accent font-bold text-2xl'
    } else return ''
  }

  const handleTabBtn = (t: string) => {
    setTab(t)
  }

  const generateTabContent = (tab: string) => {
    if (tab === '카드') {
      return <Card ArmoryCard={ArmoryCard} />
    } else if (tab === '보석') {
      return <Gem ArmoryGem={ArmoryGem} />
    } else if (tab === '장비') {
      return <Equipment ArmoryEquipment={ArmoryEquipment} />
    } else if (tab === '각인') {
      return <Engraving ArmoryEngraving={ArmoryEngraving} />
    }
  }

  return (
    <div className='w-full h-full flex flex-col space-y-4'>
      <div className='flex space-x-4 border-b '>
        {tabArray.map((t, idx) => {
          return (
            <button
              key={idx}
              onClick={() => handleTabBtn(t)}
              className={
                isActiveTab(t) +
                ` font-semibold 2xl:text-2xl text-xl hover:bg-secondary-gray/50 transition rounded px-1`
              }
            >
              {t}
            </button>
          )
        })}
      </div>
      {generateTabContent(tab)}
    </div>
  )
}
