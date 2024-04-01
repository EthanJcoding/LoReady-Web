import create from 'zustand'

interface FilterState {
  filter: string
  setFilter: (filter: string) => void
}

export const useRaidClearFilterStore = create<FilterState>(set => ({
  filter: localStorage.getItem('filter') || 'none', // 로컬 스토리지에서 가져오거나 'none'을 기본값으로 사용
  setFilter: newFilter => {
    set({ filter: newFilter })
    localStorage.setItem('filter', newFilter) // 필터 값을 로컬 스토리지에 설정
  }
}))
