interface Element {
  bPoint: number
  contentStr: string
  pointType: number
}

export interface StoneObjectInterface {
  Element_000: Element
  Element_001: Element
  Element_002: Element
}

interface ToolTipElement {
  type: string
  value: string | ToolTipItemTitle | ToolTipItemPartBox | ToolTipIndentStringGroup | null
}

export interface ToolTipIndentStringGroup {
  Element_000: {
    topStr: string
    contentStr: StoneObjectInterface
  }
}

interface ToolTipItemTitle {
  bEquip: number
  leftStr0: string
  leftStr2: string
  qualityValue: number
  rightStr0: string
  slotData: {
    advBookIcon: number
    battleItemTypeIcon: number
    cardIcon: boolean
    friendship: number
    iconGrade: number
    iconPath: string
    imagePath: string
    islandIcon: number
    petBorder: number
    rtString: string
    seal: boolean
    temporary: number
    town: number
    trash: number
  }
}

interface ToolTipItemPartBox {
  Element_000: string
  Element_001: string
}

export interface ToolTipObject {
  [key: string]: ToolTipElement
}
