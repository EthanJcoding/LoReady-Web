import Header from '@/components/landing/header/Header'
import Search from '@/components/search/Search'
import { authOptions } from '@/utils/authOptions'
import { getServerSession, Session } from 'next-auth'

interface Ownprops {
  searchParams: {
    query: string
  }
}

export async function generateMetadata({ searchParams }: Ownprops) {
  const characterName = searchParams.query

  if (!characterName) {
    return {
      title: `로레디 - 유저 검색`,
      description: '로스트아크의 유저 정보를 확인할 수 있습니다.'
    }
  }

  return {
    title: `${characterName} - 유저 검색`,
    description: '로스트아크의 유저 정보를 확인할 수 있습니다.'
  }
}

export default async function Characters() {
  const session = (await getServerSession(authOptions)) as Session

  return (
    <div className='w-full p-7 space-y-4 h-dvh flex flex-col bg-light dark:bg-dark dark:text-light max-sm:p-5'>
      <Header session={session} />
      <Search />
    </div>
  )
}
