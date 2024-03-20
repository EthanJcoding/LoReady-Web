interface ChallengeAbyss {
  Name: string
  Description: string
  MinCharacterLevel: number
  MinItemLevel: number
  AreaName: string
  StartTime: string
  EndTime: string
  Image: string
  RewardItems: RewardItem[]
}

interface RewardItem {
  Name: string
  Icon: string
  Grade: string
  StartTimes: string
}

export const getChallengeAbyss = async (): Promise<ChallengeAbyss[]> => {
  try {
    const options = {
      headers: {
        authorization: `bearer ${process.env.LOSTARK_API_KEY}`
      }
    }
    const res = await fetch(`${process.env.LOSTARK_BASE_URL}/gamecontents/challenge-abyss-dungeons`, options)
    const data: ChallengeAbyss[] = await res.json()

    return data
  } catch (error) {
    throw error
  }
}
