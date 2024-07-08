import { create } from 'zustand'

interface ScheduleFilterStore {
  isShowMySchedule: boolean
  setIsShowMySchedule: (isShowMySchedule: boolean) => void
}

export const useScheduleFilterStore = create<ScheduleFilterStore>(set => ({
  isShowMySchedule: false,
  setIsShowMySchedule: isShowMySchedule => set({ isShowMySchedule })
}))
