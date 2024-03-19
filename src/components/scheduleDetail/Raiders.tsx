'use client'

import UserInfoCard from './UserInfoCard'
import { useRaidersStore } from '@/stores/raidersStore'
import { useEffect, useState } from 'react'
import { RaidType, RaiderType } from '@/types/raid'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

interface Ownprops {
  raidersData: RaiderType[]
  firstPartyraidersData: RaiderType[]
  secondPartyraidersData: RaiderType[]
  raidType: RaidType
}

export default function Raiders({ raidersData, firstPartyraidersData, secondPartyraidersData, raidType }: Ownprops) {
  const { raiders, firstPartyRaiders, secondPartyRaiders, setRaiders, setFirstPartyRaiders, setSecondPartyRaiders } =
    useRaidersStore(state => ({
      raiders: state.raiders,
      firstPartyRaiders: state.firstPartyRaiders,
      secondPartyRaiders: state.secondPartyRaiders,
      setRaiders: state.setRaiders,
      setFirstPartyRaiders: state.setFirstPartyRaiders,
      setSecondPartyRaiders: state.setSecondPartyRaiders
    }))

  useEffect(() => {
    setRaiders(raidersData)
    setFirstPartyRaiders(firstPartyraidersData)
    setSecondPartyRaiders(secondPartyraidersData)
  }, [])

  return (
    <section className='flex flex-col basis-1/2 gap-5 bg-white rounded-md p-3 shadow-sm'>
      <DragDropContext onDragEnd={() => {}}>
        <section className='flex flex-col basis-1/2 gap-5 rounded-md border'>
          <div className='flex basis-1/2 grow rounded-md p-3 border'>
            <h6>1파티</h6>
            <Droppable droppableId='party1'>
              {provided => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {firstPartyRaiders.map((raider, idx) => (
                    <UserInfoCard
                      key={raider.CharacterName}
                      index={idx}
                      name={raider.CharacterName}
                      character={raider.CharacterName}
                      classType={raider.CharacterClassName}
                      level={raider.ItemAvgLevel}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          {raidType === '8인레이드' && (
            <div className='flex basis-1/2 rounded-md p-3 border'>
              <h6>2파티</h6>
              <Droppable droppableId='party2'>
                {provided => (
                  <ul ref={provided.innerRef} {...provided.droppableProps}>
                    {secondPartyRaiders.map((raider, idx) => (
                      <UserInfoCard
                        key={raider.CharacterName}
                        index={idx}
                        name={raider.CharacterName}
                        character={raider.CharacterName}
                        classType={raider.CharacterClassName}
                        level={raider.ItemAvgLevel}
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          )}
        </section>
        <section className='flex flex-col basis-1/2 rounded-md p-3 border'>
          <h6>공대원을 배치해주세요</h6>
          <Droppable droppableId='party0'>
            {provided => (
              <ul
                className='grid xl:grid-cols-2 lg:grid-cols-1 gap-2'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {raiders.map((raider, idx) => (
                  <UserInfoCard
                    key={raider.CharacterName}
                    index={idx}
                    name={raider.CharacterName}
                    character={raider.CharacterName}
                    classType={raider.CharacterClassName}
                    level={raider.ItemAvgLevel}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </section>
      </DragDropContext>
    </section>
  )
}
