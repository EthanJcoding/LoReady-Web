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
  characters: Characters
  channel: string
}

interface Characters {
  party0: Character[]
  party2: Character[]
  party1: Character[]
}

interface Character {
  character: string
  userId: string
}
