interface Gem {
  Slot: number
  Name: string
  Icon: string
  Level: number
  Grade: string
  Tooltip: string
  //   Tooltip: {
  //     Element_000: {
  //       type: string
  //       value: string
  //     }
  //     Element_001: {
  //       type: string
  //       value: {
  //         bEquip: number
  //         leftStr0: string
  //         leftStr2: string
  //         qualityValue: number
  //         rightStr0: string
  //         slotData: {
  //           advBookIcon: number
  //           battleItemTypeIcon: number
  //           cardIcon: boolean
  //           friendship: number
  //           iconGrade: number
  //           iconPath: string
  //           imagePath: string
  //           islandIcon: number
  //           petBorder: number
  //           rtString: string
  //           seal: boolean
  //           temporary: number
  //           town: number
  //           trash: number
  //         }
  //       }
  //     }
  //     Element_002: {
  //       type: string
  //       value: string
  //     }
  //     Element_003: {
  //       type: string
  //       value: string
  //     }
  //     Element_004: {
  //       type: string
  //       value: string
  //     }
  //     Element_005: {
  //       type: string
  //       value: {
  //         Element_000: string
  //         Element_001: string
  //       }
  //     }
  //     Element_006: {
  //       type: string
  //       value: string
  //     }
  //     Element_007: {
  //       type: string
  //       value: string
  //     }
  //   }
}

export interface GemsInterface {
  Gems: Gem[]
}
