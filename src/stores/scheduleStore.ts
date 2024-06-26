// store/scheduleStore.ts
import { create } from 'zustand'
import { Schedule, Character } from '@/types/raid'

interface ScheduleStore {
  schedule: Schedule | undefined
  setSchedule: (schedule: Schedule) => void
  setParties: (parties: { [key: string]: Character[] }) => void
  moveMemberUp: (partyKey: string, memberIndex: number) => void
  moveMemberDown: (partyKey: string, memberIndex: number) => void
  moveMemberBetweenParties: (fromPartyKey: string, toPartyKey: string, memberIndex: number) => void
  characters: Character[] | undefined
  setCharacters: (characters: Character[]) => void
}

export const useScheduleStore = create<ScheduleStore>(set => ({
  schedule: undefined,
  setSchedule: schedule => set({ schedule }),
  setParties: parties =>
    set(state => {
      if (state.schedule) {
        return { schedule: { ...state.schedule, parties } }
      }
      return state
    }),
  moveMemberUp: (partyKey, memberIndex) =>
    set(state => {
      if (!state.schedule || !state.schedule.parties[partyKey]) return state

      const newParties = { ...state.schedule.parties }
      const party = [...newParties[partyKey]]

      if (memberIndex > 0) {
        ;[party[memberIndex - 1], party[memberIndex]] = [party[memberIndex], party[memberIndex - 1]]
      }

      newParties[partyKey] = party
      return { schedule: { ...state.schedule, parties: newParties } }
    }),
  moveMemberDown: (partyKey, memberIndex) =>
    set(state => {
      if (!state.schedule || !state.schedule.parties[partyKey]) return state

      const newParties = { ...state.schedule.parties }
      const party = [...newParties[partyKey]]

      if (memberIndex < party.length - 1) {
        ;[party[memberIndex], party[memberIndex + 1]] = [party[memberIndex + 1], party[memberIndex]]
      }

      newParties[partyKey] = party
      return { schedule: { ...state.schedule, parties: newParties } }
    }),
  moveMemberBetweenParties: (fromPartyKey, toPartyKey, memberIndex) =>
    set(state => {
      if (!state.schedule || !state.schedule.parties[fromPartyKey] || !state.schedule.parties[toPartyKey]) return state

      const newParties = { ...state.schedule.parties }
      const fromParty = [...newParties[fromPartyKey]]
      const toParty = [...newParties[toPartyKey]]

      const [movedMember] = fromParty.splice(memberIndex, 1)
      toParty.push(movedMember)

      newParties[fromPartyKey] = fromParty
      newParties[toPartyKey] = toParty

      return { schedule: { ...state.schedule, parties: newParties } }
    }),

  characters: undefined,
  setCharacters: characters =>
    set(state => {
      if (state.schedule) {
        return { schedule: { ...state.schedule, characters } }
      }
      return state
    })
}))
