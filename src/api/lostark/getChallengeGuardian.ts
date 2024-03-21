interface ChallengeGuardian {
  Raids: Raid[]
  RewardItems: RewardItem[]
}

interface Raid {
  Name: string
  Description: string
  MinCharacterLevel: number
  MinItemLevel: number
  StartTime: string
  EndTime: string
  Image: string
}

interface RewardItem {
  ExpeditionItemLevel: number
  Items: Item[]
}

interface Item {
  Name: string
  Icon: string
  Grade: string
  StartTimes: string[]
}

export const getChallengeGuardian = async (): Promise<ChallengeGuardian> => {
  try {
    const options = {
      headers: {
        authorization: `bearer ${process.env.LOSTARK_API_KEY}`
      }
    }
    const res = await fetch(`${process.env.LOSTARK_BASE_URL}/gamecontents/challenge-guardian-raids`, options)
    const data: ChallengeGuardian = await res.json()

    return data
  } catch (error) {
    throw error
  }
}
