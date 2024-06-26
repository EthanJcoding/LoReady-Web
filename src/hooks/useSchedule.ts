// hooks/useSchedule.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getScheduleData } from '@/api/firebase'
import { getCharacterData } from '@/api/lostark/getCharacterData'
import { useScheduleStore } from '@/stores/scheduleStore'
import { Schedule, Character } from '@/types/raid'
import useCharacterStore from '@/stores/characterStore'

// 스케줄 데이터를 가져오는 함수
const fetchSchedule = async (scheduleId: string) => {
  const scheduleData = (await getScheduleData(scheduleId)) as Schedule
  const parties = await fetchCharacterData(scheduleData)
  return { ...scheduleData, parties }
}

// 캐릭터 데이터를 병합하는 함수
const fetchCharacterData = async (scheduleData: Schedule) => {
  const characterDataByParty: { [key: string]: Character[] } = {}

  for (const [partyKey, party] of Object.entries(scheduleData.parties)) {
    characterDataByParty[partyKey] = []

    for (const user of party) {
      try {
        const characterData = await getCharacterData(user.character)
        user.data = characterData
        characterDataByParty[partyKey].push(user)
      } catch (err) {
        console.error(`Error fetching data for character ${user.character}:`, err)
      }
    }
  }

  return characterDataByParty
}

export const useSchedule = (scheduleId: string) => {
  const queryClient = useQueryClient()
  const { setSchedule, setCharacters } = useScheduleStore()
  const setSelectedCharacter = useCharacterStore(state => state.setSelectedCharacter)

  const { data, isPending, error } = useQuery({
    queryKey: ['schedule', scheduleId],
    queryFn: async () => {
      const data = await fetchSchedule(scheduleId)
      const defaultCharacter = data.parties.party1.length === 0 ? data.parties.party2[0] : data.parties.party1[0]

      setSelectedCharacter(defaultCharacter)
      setSchedule(data)
      setCharacters(data.characters)

      return data
    }
  })

  const updateScheduleMutation = useMutation({
    mutationFn: async () => (await getScheduleData(scheduleId)) as Schedule,
    onSuccess: updatedSchedule => {
      queryClient.setQueryData(['schedule', scheduleId], updatedSchedule)
      setSchedule(updatedSchedule)
    }
  })

  return {
    schedule: data,
    isLoading: isPending,
    error,
    updateSchedule: updateScheduleMutation.mutate
  }
}
