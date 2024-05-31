interface Card {
  Slot: number
  Name: string
  Icon: string
  AwakeCount: number
  AwakeTotal: number
  Grade: string
  Tooltip: string
}

interface EffectItem {
  Name: string
  Description: string
}

interface Effect {
  Index: number
  CardSlots: number[]
  Items: EffectItem[]
}

export interface CardsInterface {
  Cards: Card[]
  Effects: Effect[]
}
