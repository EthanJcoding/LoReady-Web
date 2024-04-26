interface Engraving {
  Slot: number
  Name: string
  Icon: string
  Tooltip: string
}

interface Effect {
  Icon: string
  Name: string
  Description: string
}

export interface EngravingInterface {
  Engravings: Engraving[]
  Effects: Effect[]
}
