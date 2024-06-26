export type RaidType = '8인레이드' | '4인레이드'

export interface Schedule {
  participants: string[]
  created: string
  updated: string
  parties: {
    [key: string]: Character[]
  }
  isActive: boolean
  raidName: string
  channel: string
  raidLeader: {
    character: string
    userId: string
  }
  raidType: '4인레이드' | '8인레이드'
  raidDate: string
  createdBy: string
  characters: Character[]
}

export interface Character {
  userId: string
  character: string
  data?: any
}
