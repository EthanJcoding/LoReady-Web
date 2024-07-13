import { ArmoryCardsInterface } from '@/types/Equipments/armory'
import Image from 'next/image'

interface Ownprops {
  ArmoryCard: ArmoryCardsInterface
}

export default function Card({ ArmoryCard }: Ownprops) {
  return (
    <div className='flex flex-col w-full '>
      <h1 className='p-1 font-semibold text-center '>
        {ArmoryCard.Effects[0].Items[ArmoryCard.Effects[0].Items.length - 1].Name}
      </h1>
      <div className='flex gap-2'>
        {ArmoryCard.Cards.map((card, idx) => (
          <div key={idx} className='text-center w-full'>
            <div className='relative p-1'>
              <Image
                src={card.Icon}
                width={80}
                height={80}
                alt='카드'
                className='w-full rounded relative shadow-md'
                loading='lazy'
              />
              <div className='absolute bottom-0 right-0 rounded-full w-6 h-6 bg-gradient-to-tr from-[#A67B0A] to-[#fae166] '>
                <span className='text-white text-sm font-semibold text-center'> {card.AwakeCount}</span>
              </div>
            </div>
            <div className='text-xs font-semibold'>{card.Name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
