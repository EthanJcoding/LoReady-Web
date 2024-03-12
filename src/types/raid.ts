import { CharacterInfoType } from './character'

export type RaidType = '8인레이드' | '4인레이드'

export interface RaiderType extends CharacterInfoType {
  userName: string
}
