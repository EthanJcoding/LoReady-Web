'use client'

import { useEffect, useState } from 'react'
import { savePartyData } from '@/api/firebase/savePartyData/savePartyData'
import Popover from './Popover'
import RaidLeaderDropdown from './RaidLeaderDropdown'
import dayjs from 'dayjs'
import { Session } from 'next-auth'
import { useToast } from '@/hooks/useToast'
import { useScheduleStore } from '@/stores/scheduleStore'
import useDropdonwStore from '@/stores/dropdownStore'
import PartyList from './PartyList'
import { useSearchParams } from 'next/navigation'

interface Ownprops {
  userData: Session | null
  scheduleId: string
  isLoading: boolean
}

export default function TeamAllocator({ userData, scheduleId, isLoading }: Ownprops) {
  const userId = userData?.user.id
  const searchParams = useSearchParams()
  const { schedule } = useScheduleStore()
  const { setDropdownSelectedCharacter } = useDropdonwStore()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isJoining, setIsJoining] = useState(false)

  const toast = useToast()

  if (schedule !== undefined && !isLoading) {
    const isUserIdExist =
      schedule.parties.party1.some(member => member.userId === userId) ||
      schedule.parties.party2.some(member => member.userId === userId)

    const handleSave = async () => {
      if (schedule.parties.party1.length < 5 && schedule.parties.party2.length < 5) {
        const dataFilteredParty1 = schedule.parties.party1.map(el => ({ userId: el.userId, character: el.character }))
        const dataFilteredParty2 = schedule.parties.party2.map(el => ({ userId: el.userId, character: el.character }))
        await savePartyData(scheduleId, dataFilteredParty1, dataFilteredParty2)

        toast('저장되었습니다.', { type: 'success', duration: 5000 })
      } else {
        toast('한 파티에는 4명까지 참여 가능합니다.', { type: 'fail', duration: 5000 })
      }
    }

    const handleJoinParty = () => {
      setDropdownSelectedCharacter({ character: '캐릭터를 선택해주세요', userId: '0' })
      setIsPopoverOpen(true)
      setIsJoining(true)
    }

    useEffect(() => {
      if (searchParams.get('join') === 'true' && !isUserIdExist) {
        handleJoinParty()
      }
    }, [])

    return (
      <>
        <section className='flex flex-col border lg:w-1/3 w-full lg:h-full h-1/2 p-8 rounded-lg shadow-sm space-y-4 overflow-y-scroll lg:overflow-auto '>
          <header className='font-semibold border-b flex justify-between w-full items-center p-2'>
            <span className='2xl:text-2xl text-xl truncate'>{schedule.raidName}</span>
            <span className='hidden lg:flex truncate'>{dayjs(schedule.raidDate).format('MM월 DD일')}</span>
          </header>

          <PartyList
            raidType={schedule.raidType}
            userId={userId}
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
          />

          <div className='flex w-full space-x-4 items-end justify-end'>
            <RaidLeaderDropdown scheduleId={scheduleId} />
            {isUserIdExist ? null : (
              <button
                onClick={() => handleJoinParty()}
                className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 lg:px-4 lg:py-2 px-2 rounded transition text-xs lg:text-base'
              >
                참여하기
              </button>
            )}

            <button
              onClick={() => handleSave()}
              className='truncate text-dark dark:text-light bg-transparent hover:bg-secondary-gray/50 font-medium h-10 lg:px-4 lg:py-2 px-2 border rounded transition text-xs lg:text-base'
            >
              저장하기
            </button>
          </div>
        </section>

        <Popover
          isJoining={isJoining}
          setIsJoining={setIsJoining}
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          scheduleId={scheduleId}
          userData={userData}
        />
      </>
    )
  }
}
