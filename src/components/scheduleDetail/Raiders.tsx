'use client'

import UserInfoCard from './UserInfoCard'
import { useRaidersStore } from '@/stores/raidersStore'
import { useEffect } from 'react'
import { RaidType, RaiderType } from '@/types/raid'

interface Ownprops {
  raidersData: RaiderType[]
  raidType: RaidType
}

export default function Raiders({ raidersData, raidType }: Ownprops) {
  const { raiders, firstPartyRaiders, secondPartyRaiders, setRaiders } = useRaidersStore()

  useEffect(() => {
    setRaiders(raidersData)
    console.log(raidersData)
  }, [])

  return (
    <section className='flex flex-col basis-1/2 gap-5 bg-white rounded-md p-3 shadow-sm'>
      <section className='flex basis-1/2 gap-5 rounded-md border'>
        <div className='flex basis-1/2 rounded-md p-3 border'>
          <h6>1파티</h6>
          <ul>
            {firstPartyRaiders.map(raider => (
              <UserInfoCard
                key={raider.CharacterName}
                name={raider.CharacterName}
                character={raider.CharacterName}
                classType={raider.CharacterClassName}
                level={raider.ItemAvgLevel}
              />
            ))}
          </ul>
        </div>
        {raidType === '8인레이드' && (
          <div className='flex basis-1/2 rounded-md p-3 border'>
            <h6>2파티</h6>
            <ul>
              {secondPartyRaiders.map(raider => (
                <UserInfoCard
                  key={raider.CharacterName}
                  name={raider.CharacterName}
                  character={raider.CharacterName}
                  classType={raider.CharacterClassName}
                  level={raider.ItemAvgLevel}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className='flex flex-col basis-1/2 rounded-md p-3 border'>
        <h6>공대원을 배치해주세요</h6>
        <ul className='grid xl:grid-cols-2 lg:grid-cols-1 gap-2'>
          {raiders.map(raider => (
            <UserInfoCard
              key={raider.CharacterName}
              name={raider.CharacterName}
              character={raider.CharacterName}
              classType={raider.CharacterClassName}
              level={raider.ItemAvgLevel}
            />
          ))}
        </ul>
      </section>
    </section>
  )
}
