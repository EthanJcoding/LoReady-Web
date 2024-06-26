'use client'

import { Session } from 'next-auth'
import CharacterDetail from './CharacterDetail/CharacterDetail'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TeamAllocator from './TeamAllocator/TeamAllocator'
import { useSchedule } from '@/hooks/useSchedule'
import { FaSpinner } from 'react-icons/fa'

interface Ownprops {
  userData: Session | null
  scheduleId: string
}

export default function Raid({ userData, scheduleId }: Ownprops) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RaidChildren userData={userData} scheduleId={scheduleId} />
    </QueryClientProvider>
  )
}

function RaidChildren({ userData, scheduleId }: Ownprops) {
  const { isLoading } = useSchedule(scheduleId)

  if (isLoading) {
    return (
      <div className='border rounded-lg w-full h-full flex items-center justify-center'>
        <FaSpinner className='animate-spin text-7xl' color='#00a4e8' />
      </div>
    )
  }

  return (
    <>
      <TeamAllocator userData={userData} scheduleId={scheduleId} isLoading={isLoading} />
      <CharacterDetail isLoading={isLoading} />
    </>
  )
}
