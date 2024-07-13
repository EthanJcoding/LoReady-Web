export interface ArmoryAvatarsInterface {
  Grade: string
  Icon: string
  isInner: boolean
  isSet: boolean
  Name: string
  Tooltip: string
  Type: string
}

export interface ArmoryCardsInterface {
  Cards: {
    AwakeCount: number
    AwakeTotal: number
    Grade: string
    Icon: string
    Name: string
    Slot: number
    Tooltip: string
  }[]
  Effects: { CardSlots: number[]; Items: { Name: string; Description: string }[] }[]
}

export interface ArmoryEngravingInterface {
  ArkPassiveEffects: null
  Effects: { Desciption: string; Icon: string; Name: string }[]
  Engravings: { Icon: string; name: string; Slot: number; Tooltip: string }[]
}

export interface ArmoryEquipmentInterface {
  Type: string
  Name: string
  Icon: string
  Tooltip: string
  Grade: string
}

export interface ArmoryGemInterface {
  Effects: {
    Description: string
    Skills: { Description: string[]; GemSlot: number; Icon: string; Name: string; Option: string; Tooltip: string }[]
  }
  Gems: { Grade: string; Icon: string; Level: number; Name: string; Slot: number; Tooltip: string }[]
}

export interface ArmoryProfileInterface {
  ArkPassive: { iseArkPassive: false; Points: { Name: string; Tooltip: string; value: number }[] }
  CharacterClassName: string
  CharacterImage: string
  CharacterLevel: number
  CharacterName: string
  ExpeditionLevel: number
  GuildMemberGrade: string
  GuildName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
  PvpGradeName: string
  ServerName: string
  Stats: { Tooltip: string[]; Type: string; Value: string }[]
  Tendencies: { Type: string; Points: number; MaxPoint: number }[]
  Title: string
  TotalSkillPoint: number
  TownLevel: number
  TownName: string
  UsingSkillPoint: number
}

export interface ArmorySkillsInterface {
  Icon: string
  IsAwakening: boolean
  Level: number
  Name: string
  Rune: { Grade: string; Icon: string; Name: string; Tooltip: string } | null
  Tooltip: string
  Tripods: {
    Icon: string
    IsSelected: boolean
    Level: number
    Name: string
    Slot: number
    Tier: number
    Tooltip: string
  }[]
  Type: string
}
