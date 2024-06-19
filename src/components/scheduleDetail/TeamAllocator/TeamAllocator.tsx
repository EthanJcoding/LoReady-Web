'use client'

import { useState } from 'react'
import { FaArrowUp, FaArrowDown, FaRegCaretSquareDown, FaRegCaretSquareUp } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { savePartyData } from '@/api/firebase/savePartyData/savePartyData'
import Popover from './Popover'
import { Character } from '@/types/schedule'
import RaidLeaderDropdown from './RaidLeaderDropdown'
import { PiCrownSimpleFill } from 'react-icons/pi'
import dayjs from 'dayjs'
import { Session } from 'next-auth'
import { useToast } from '@/hooks/useToast'

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
  scheduleId: string
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
  userData,
  scheduleId
}: Ownprops) {
  const [partyData, setPartyData] = useState(parties)
  const [frontRaidLeader, setFrontRaidLeader] = useState(raidLeader)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [dropdownSelectedCharacter, setDropdownSelectedCharacter] = useState(selectedCharacter)
  const [isJoining, setIsJoining] = useState(false)
  const userId = userData?.user.id
  const [isUserIdExist, setIsUserIdExist] = useState(
    partyData.party1.some(member => member.userId === userId) ||
      partyData.party2.some(member => member.userId === userId)
  )

  const toast = useToast()

  const moveMemberUp = (partyIndex: number, memberIndex: number) => {
    setPartyData(prevPartyData => {
      const newPartyData = { ...prevPartyData }
      const targetParty = partyIndex === 0 ? [...newPartyData.party1] : [...newPartyData.party2]

      if (memberIndex > 0) {
        ;[targetParty[memberIndex - 1], targetParty[memberIndex]] = [
          targetParty[memberIndex],
          targetParty[memberIndex - 1]
        ]
      } else if (partyIndex === 1 && newPartyData.party1.length > 0) {
        const movedMember = targetParty.shift()
        newPartyData.party1 = [...newPartyData.party1, movedMember!]
      }

      if (partyIndex === 0) {
        newPartyData.party1 = targetParty
      } else {
        newPartyData.party2 = targetParty
      }

      return newPartyData
    })
  }

  const moveMemberDown = (partyIndex: number, memberIndex: number) => {
    setPartyData(prevPartyData => {
      const newPartyData = { ...prevPartyData }
      const targetParty = partyIndex === 0 ? [...newPartyData.party1] : [...newPartyData.party2]

      if (memberIndex < targetParty.length - 1) {
        ;[targetParty[memberIndex], targetParty[memberIndex + 1]] = [
          targetParty[memberIndex + 1],
          targetParty[memberIndex]
        ]
      } else if (partyIndex === 0 && newPartyData.party1.length > 0) {
        const movedMember = targetParty.pop()
        newPartyData.party2 = [movedMember!, ...newPartyData.party2]
      }

      if (partyIndex === 0) {
        newPartyData.party1 = targetParty
      } else {
        newPartyData.party2 = targetParty
      }

      return newPartyData
    })
  }

  const moveMember = (partyIndex: number, memberIndex: number) => {
    setPartyData(prevPartyData => {
      const newPartyData = { ...prevPartyData }
      const fromParty = partyIndex === 0 ? [...newPartyData.party1] : [...newPartyData.party2]
      const toParty = partyIndex === 0 ? [...newPartyData.party2] : [...newPartyData.party1]
      const [movedMember] = fromParty.splice(memberIndex, 1)

      toParty.push(movedMember)

      if (partyIndex === 0) {
        newPartyData.party1 = fromParty
        newPartyData.party2 = toParty
      } else {
        newPartyData.party1 = toParty
        newPartyData.party2 = fromParty
      }

      return newPartyData
    })
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
    if (partyData.party1.length < 5 && partyData.party2.length < 5) {
      const dataFilteredParty1 = partyData.party1.map(el => ({ userId: el.userId, character: el.character }))
      const dataFilteredParty2 = partyData.party2.map(el => ({ userId: el.userId, character: el.character }))
      savePartyData(scheduleId, dataFilteredParty1, dataFilteredParty2)

      toast('저장되었습니다.', { type: 'success', duration: 5000 })
    } else {
      toast('한 파티에는 4명까지 참여 가능합니다.', { type: 'fail', duration: 5000 })
    }
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
        <section className='flex flex-col border sm:w-1/3 w-full sm:h-full h-1/2 p-8 rounded-lg shadow-sm space-y-4 overflow-y-scroll sm:overflow-auto justify-between'>
          <div className='w-full sm:h-1/2 space-y-2'>
            <h1 className='font-semibold border-b flex justify-between w-full items-center'>
              <span className='2xl:text-2xl text-xl truncate'>{raidName}</span>
              <span className='hidden lg:flex truncate'>{dayjs(raidDate).format('MM월 DD일')}</span>
            </h1>
            <div className='text-lg font-semibold'>파티 리스트</div>
            {partyData.party1.map((member, idx) => {
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
            {isUserIdExist ? null : (
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
          partyData={partyData}
          setPartyData={setPartyData}
          scheduleId={scheduleId}
          userData={userData}
          setIsUserIdExist={setIsUserIdExist}
          setSelectedCharacter={setSelectedCharacter}
        />
      </>
    )
  }

  if (raidType === '8인레이드') {
    return (
      <>
        <section className='flex flex-col border sm:w-1/3 w-full sm:h-full h-1/2 p-8 rounded-lg shadow-sm space-y-4 overflow-y-scroll sm:overflow-auto justify-between'>
          <div className='w-full sm:h-1/2 space-y-2'>
            <h1 className='font-semibold border-b flex justify-between w-full items-center'>
              <span className='2xl:text-2xl text-xl truncate'>{raidName}</span>
              <span className='hidden lg:flex truncate'>{dayjs(raidDate).format('MM월 DD일')}</span>
            </h1>
            <div className='text-lg font-semibold '>1번 파티</div>
            {partyData.party1.map((member, idx) => {
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
            {partyData.party2.map((member, idx) => {
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
            {isUserIdExist ? null : (
              <button
                onClick={() => handleJoinParty()}
                className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-xs sm:text-base'
              >
                참여하기
              </button>
            )}

            <button
              onClick={() => handleSave()}
              className='truncate text-dark dark:text-light bg-transparent hover:bg-secondary-gray/50 font-medium h-10 md:px-4 md:py-2 px-2 border rounded transition text-xs sm:text-base'
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
          partyData={partyData}
          setPartyData={setPartyData}
          scheduleId={scheduleId}
          userData={userData}
          setIsUserIdExist={setIsUserIdExist}
          setSelectedCharacter={setSelectedCharacter}
        />
      </>
    )
  }
}
