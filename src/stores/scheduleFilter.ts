import { create } from 'zustand'

interface ScheduleFilterStore {
  isShowMySchedule: boolean
  setIsShowMySchedule: () => void
}

export const useScheduleFilterStore = create<ScheduleFilterStore>(set => ({
  isShowMySchedule: false,
  setIsShowMySchedule: () => set(state => ({ isShowMySchedule: !state.isShowMySchedule }))
}))
