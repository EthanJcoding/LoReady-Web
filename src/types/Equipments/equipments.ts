export interface EquipmentInterface {
  Type: string
  Name: string
  Icon: string
  Tooltip: string
  Grade: string
}

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
