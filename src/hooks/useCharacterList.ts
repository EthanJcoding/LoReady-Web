import { getUserData } from '@/api/firebase'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ArmoryProfileInterface } from '@/types/Equipments/armory'
import { User } from '@/types/users'
import { useQuery } from '@tanstack/react-query'

export const useCharacterList = (userId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['characterList', userId],
    queryFn: async () => {
      const { registeredBy } = (await getUserData(userId)) as User
      const data = await getCharacterList(registeredBy)
      return data
    }
  })

  return {
    characterList: data as ArmoryProfileInterface[],
    isLoading: isPending,
    error
  }
}
