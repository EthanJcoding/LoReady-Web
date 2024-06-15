'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { FaArrowUp, FaArrowDown, FaRegCaretSquareDown, FaRegCaretSquareUp } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { savePartyData } from '@/api/firebase/savePartyData/savePartyData'
import Popover from './Popover'
import { Character } from '@/types/schedule'
import RaidLeaderDropdown from './RaidLeaderDropdown'
import { PiCrownSimpleFill } from 'react-icons/pi'
import dayjs from 'dayjs'
import { Session } from 'next-auth'

interface Ownprops {
  parties: { [key: string]: Character[] }
  setSelectedCharacter: (character: Character) => void
  selectedCharacter: Character
  raidType: string
  raidLeader: Character
  characters: Character[]
  raidName: string
  raidDate: string
  userData: Session | null
}

export default function TeamAllocator({
  parties,
  setSelectedCharacter,
  selectedCharacter,
  raidType,
  raidLeader,
  characters,
  raidName,
  raidDate,
  userData
}: Ownprops) {
  const [party1, setParty1] = useState(parties.party1)
  const [party2, setParty2] = useState(parties.party2)
  const [frontRaidLeader, setFrontRaidLeader] = useState(raidLeader)
  const params = useParams<{ channelId: string; scheduleId: string }>()
  const { scheduleId } = params
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [dropdownSelectedCharacter, setDropdownSelectedCharacter] = useState(selectedCharacter)
  const [isJoining, setIsJoining] = useState(false)
  const userId = userData?.user.id

  const moveMemberUp = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0 && memberIndex > 0) {
      const newParty1 = [...party1]
      ;[newParty1[memberIndex - 1], newParty1[memberIndex]] = [newParty1[memberIndex], newParty1[memberIndex - 1]]
      setParty1(newParty1)
    } else if (partyIndex === 1 && party1.length === 0) {
      const newParty2 = [...party2]
      const movedMember = newParty2.shift()!
      setParty2(newParty2)
      setParty1([movedMember])
    } else if (partyIndex === 1 && memberIndex > 0) {
      const newParty2 = [...party2]
      ;[newParty2[memberIndex - 1], newParty2[memberIndex]] = [newParty2[memberIndex], newParty2[memberIndex - 1]]
      setParty2(newParty2)
    } else if (partyIndex === 1 && memberIndex === 0 && party1.length > 0) {
      const newParty1 = [...party1]
      const newParty2 = [...party2]
      const movedMember = newParty2.shift()!
      setParty2(newParty2)
      setParty1([...newParty1, movedMember])
    }
  }

  const moveMemberDown = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0 && memberIndex < party1.length - 1) {
      const newParty1 = [...party1]
      ;[newParty1[memberIndex], newParty1[memberIndex + 1]] = [newParty1[memberIndex + 1], newParty1[memberIndex]]
      setParty1(newParty1)
    } else if (partyIndex === 1 && memberIndex < party2.length - 1) {
      const newParty2 = [...party2]
      ;[newParty2[memberIndex], newParty2[memberIndex + 1]] = [newParty2[memberIndex + 1], newParty2[memberIndex]]
      setParty2(newParty2)
    } else if (partyIndex === 0 && memberIndex === party1.length - 1 && party1.length > 0) {
      const newParty1 = [...party1]
      const movedMember = newParty1.pop()!
      setParty1(newParty1)
      setParty2([movedMember, ...party2])
    }
  }

  const moveMember = (partyIndex: number, memberIndex: number) => {
    if (partyIndex === 0) {
      const newParty1 = party1.filter(el => el !== party1[memberIndex])
      const newParty2 = [...party2, party1[memberIndex]]

      setParty1(newParty1)
      setParty2(newParty2)
    }

    if (partyIndex === 1) {
      const newParty2 = party2.filter(el => el !== party2[memberIndex])
      const newParty1 = [...party1, party2[memberIndex]]

      setParty1(newParty1)
      setParty2(newParty2)
    }
  }

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character)
  }

  const isSelected = (character: string) => {
    if (character === selectedCharacter.character) {
      return true
    } else return false
  }

  const isUserCharacter = (character: Character) => {
    return userId === character.userId ? true : false
  }

  const handleSave = () => {
    if (party1.length < 5 && party2.length < 5) {
      const dataFilteredParty1 = party1.map(el => ({ userId: el.userId, character: el.character }))
      const dataFilteredParty2 = party2.map(el => ({ userId: el.userId, character: el.character }))

      savePartyData(scheduleId, dataFilteredParty1, dataFilteredParty2)

      window.alert('저장완료')
    } else {
      window.alert('한 파티에는 4명까지 참여 가능합니다')
    }
  }

  // 주어진 userId가 데이터에 있는지 확인하는 함수
  const isUserIdExist = (userId: string) => {
    return (
      parties.party1.some(member => member.userId === userId) || parties.party2.some(member => member.userId === userId)
    )
  }

  const handleCharacterSetting = (character: Character) => {
    setSelectedCharacter(character)
    setDropdownSelectedCharacter(character)
    setIsPopoverOpen(!isPopoverOpen)
  }

  const handleJoinParty = async () => {
    setDropdownSelectedCharacter({ character: '캐릭터를 선택해주세요', userId: '0' })
    setIsPopoverOpen(true)
    setIsJoining(true)
  }

  if (raidType === '4인레이드') {
    return (
      <>
        <section className='flex flex-col border sm:w-1/3 w-full h-full p-8 rounded-lg shadow-sm space-y-4 overflow-scroll justify-between'>
          <div className='w-full sm:h-1/2 space-y-2'>
            <h1 className='font-semibold border-b flex justify-between w-full items-center'>
              <span className='2xl:text-2xl text-xl truncate'>{raidName}</span>
              <span className='hidden lg:flex truncate'>{dayjs(raidDate).format('MM월 DD일')}</span>
            </h1>
            <div className='text-lg font-semibold'>파티 리스트</div>
            {party1.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    isSelected(member.character)
                      ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent'
                      : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
                  }
                >
                  <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                    <div>{idx + 1}.</div>
                    {frontRaidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                    <div className='truncate'>{member.character}</div>
                  </button>
                  <div className='flex space-x-2'>
                    {isUserCharacter(member) ? (
                      <button onClick={() => handleCharacterSetting(member)}>
                        <FaGear />
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex w-full h-full space-x-4 items-end justify-end'>
            <RaidLeaderDropdown
              scheduleId={scheduleId}
              frontRaidLeader={frontRaidLeader}
              setFrontRaidLeader={setFrontRaidLeader}
              characters={characters}
            />
            {isUserIdExist(userId) ? null : (
              <button
                onClick={() => handleJoinParty()}
                className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-xs sm:text-base'
              >
                참여하기
              </button>
            )}
          </div>
        </section>

        <Popover
          isJoining={isJoining}
          setIsJoining={setIsJoining}
          targetCharacter={selectedCharacter.character}
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          dropdownSelectedCharacter={dropdownSelectedCharacter}
          setDropdownSelectedCharacter={setDropdownSelectedCharacter}
          parties={parties}
          scheduleId={scheduleId}
        />
      </>
    )
  }

  if (raidType === '8인레이드') {
    return (
      <>
        <section className='flex flex-col border sm:w-1/3 w-full h-full p-8 rounded-lg shadow-sm space-y-4 overflow-scroll justify-between'>
          <div className='w-full sm:h-1/2 space-y-2'>
            <h1 className='font-semibold border-b flex justify-between w-full items-center'>
              <span className='2xl:text-2xl text-xl truncate'>{raidName}</span>
              <span className='hidden lg:flex truncate'>{dayjs(raidDate).format('MM월 DD일')}</span>
            </h1>
            <div className='text-lg font-semibold '>1번 파티</div>
            {party1.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    isSelected(member.character)
                      ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent'
                      : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
                  }
                >
                  <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                    <div>{idx + 1}.</div>
                    {frontRaidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                    <div className=''>{member.character}</div>
                  </button>
                  <div className='flex space-x-2'>
                    <button onClick={() => moveMember(0, idx)}>
                      <FaRegCaretSquareDown />
                    </button>
                    <button onClick={() => moveMemberDown(0, idx)}>
                      <FaArrowDown />
                    </button>
                    <button onClick={() => moveMemberUp(0, idx)}>
                      <FaArrowUp />
                    </button>
                    {isUserCharacter(member) ? (
                      <button onClick={() => handleCharacterSetting(member)}>
                        <FaGear />
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
          <div className='w-full sm:h-1/2 space-y-2'>
            <span className='text-lg font-semibold'>2번 파티</span>
            {party2.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    isSelected(member.character)
                      ? 'bg-secondary-gray/50 flex w-full border p-2 rounded border-primary-accent '
                      : 'flex w-full border p-2 rounded hover:bg-secondary-gray/50 transition'
                  }
                >
                  <button onClick={() => handleSelect(member)} className='flex space-x-2 w-full items-center'>
                    <div>{idx + 1}.</div>
                    {frontRaidLeader.character === member.character && <PiCrownSimpleFill color='#FCD34D' />}
                    <div className='truncate'>{member.character}</div>
                  </button>
                  <div className='flex space-x-2'>
                    <button onClick={() => moveMember(1, idx)}>
                      <FaRegCaretSquareUp />
                    </button>
                    <button onClick={() => moveMemberDown(1, idx)}>
                      <FaArrowDown />
                    </button>
                    <button onClick={() => moveMemberUp(1, idx)}>
                      <FaArrowUp />
                    </button>
                    {isUserCharacter(member) ? (
                      <button onClick={() => handleCharacterSetting(member)}>
                        <FaGear />
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>

          <div className='flex w-full space-x-4 items-end justify-end'>
            <RaidLeaderDropdown
              scheduleId={scheduleId}
              frontRaidLeader={frontRaidLeader}
              setFrontRaidLeader={setFrontRaidLeader}
              characters={characters}
            />
            {isUserIdExist(userId) ? null : (
              <button
                onClick={() => handleJoinParty()}
                className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-xs sm:text-base'
              >
                참여하기
              </button>
            )}

            <button
              onClick={() => handleSave()}
              className='truncate text-light bg-transparent hover:bg-secondary-gray/50 font-medium h-10 md:px-4 md:py-2 px-2 border rounded transition text-xs sm:text-base'
            >
              저장하기
            </button>
          </div>
        </section>

        <Popover
          isJoining={isJoining}
          setIsJoining={setIsJoining}
          targetCharacter={selectedCharacter.character}
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          dropdownSelectedCharacter={dropdownSelectedCharacter}
          setDropdownSelectedCharacter={setDropdownSelectedCharacter}
          parties={parties}
          scheduleId={scheduleId}
        />
      </>
    )
  }
}
