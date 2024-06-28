interface Engraving {
  Slot: number
  Name: string
  Icon: string
  Tooltip: string
}

export interface EngravingEffect {
  Icon: string
  Name: string
  Description: string
}

export interface EngravingInterface {
  Engravings: Engraving[]
  Effects: EngravingEffect[]
}
