export interface ScheduleWithId extends Schedule {
  id: string
}

export interface Schedule {
  created: string
  raidLeader: Character
  raidType: string
  isActive: boolean
  createdBy: string
  updated: string
  raidDate: string
  raidName: string
  participants: string[]
  characters: Character[]
  channel: string
  parties: Party
}

interface Party {
  party1: Character[]
  party2: Character[]
}

export interface Character {
  character: string
  userId: string
}
