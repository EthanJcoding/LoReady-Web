interface Stat {
  Type: string
  Value: string
  Tooltip: string[]
}

interface Tendency {
  Type: string
  Point: number
  MaxPoint: number
}

export interface ProfileInterface {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel: number
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: Stat[]
  Tendencies: Tendency[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}
