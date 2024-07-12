import { getUserData } from '@/api/firebase'
import { User } from '@/types/users'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import HeaderLink from './HeaderLink'

export default async function Gnb() {
  let dashboardUrl = ''
  const session = await getServerSession(authOptions)

  if (session) {
    const { channels } = (await getUserData(session.user.id)) as User
    dashboardUrl = `/${channels[0]}/dashboard`
  }

  return (
    <ul className='gap-4 hidden sm:flex'>
      <li>
        <HeaderLink href={process.env.NEXT_PUBLIC_DOCUMENT_LINK as string} target='_blank'>
          사용법
        </HeaderLink>
      </li>
      <li>
        <HeaderLink href={process.env.NEXT_PUBLIC_ADDBOT_LINK as string}>봇 추가하기</HeaderLink>
      </li>
      {session && (
        <li>
          <HeaderLink href={dashboardUrl}>대시보드</HeaderLink>
        </li>
      )}
    </ul>
  )
}
