import { getCharacterProfile } from '@/api/lostark/getCharacterProfile'
import { ChaListInterface } from '@/types/characterList'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import Image from 'next/image'
import Setting from './Setting'
import { FaExclamationCircle } from 'react-icons/fa'

interface OwnProps {
  members: User[]
  session: Session
}

const moveUsernameToFront = (members: User[], targetUsername: string): User[] => {
  const index = members.findIndex(user => user.username === targetUsername)
  if (index !== -1) {
    const [targetUser] = members.splice(index, 1)
    return [targetUser, ...members]
  }
  return members
}

const CharacterInfo = ({ label, value }: { label: string; value: string | number }) => (
  <div className='flex w-full gap-2 items-center'>
    <span className='flex-none border rounded-xl px-2 font-semibold'>{label}</span>
    <span className='font-medium truncate'>{value}</span>
  </div>
)

const MemberCardContent = ({ data, m, session }: { data: ChaListInterface; m: User; session: Session }) => (
  <>
    <header className='flex flex-col justify-center border-b space-y-4'>
      <div className='flex'>
        <div className='flex w-full justify-center'>
          <Image
            src={data.CharacterImage}
            width={150}
            height={150}
            alt='캐릭터'
            className='w-24 h-24 object-none object-top rounded-full shadow'
          />
        </div>
        {session?.user.name === m.username && <Setting registeredBy={m.registeredBy} session={session} />}
      </div>
      <span className='text-primary-accent text-xl font-medium text-center'>{m.registeredBy}</span>
      <span className='text-sm font-medium text-center'>{m.globalName}</span>
    </header>
    <main className='flex w-full justify-between text-xs'>
      <section className='space-y-2 w-1/2'>
        <CharacterInfo label='서버' value={data.ServerName} />
        <CharacterInfo label='원정대' value={data.ExpeditionLevel} />
        <CharacterInfo label='길드' value={data.GuildName} />
        <CharacterInfo label='칭호' value={data.Title} />
      </section>
      <section className='space-y-2'>
        <CharacterInfo label='레벨' value={data.ItemAvgLevel} />
        <CharacterInfo label='직업' value={data.CharacterClassName} />
      </section>
    </main>
  </>
)

const ErrorCard = ({ m, session }: { m: User; session: Session }) => (
  <>
    <header className='flex flex-col justify-center border-b space-y-4'>
      <div className='flex'>
        <div className='flex w-full justify-center'>
          <FaExclamationCircle size={96} />
        </div>
        {session?.user.name === m.username && <Setting registeredBy={m.registeredBy} session={session} />}
      </div>
      <span className='text-primary-accent text-xl font-medium text-center'>{m.registeredBy}</span>
      <span className='text-sm font-medium text-center'>{m.globalName}</span>
    </header>
    <main className='flex w-full justify-center items-center h-full'>
      <span className='font-medium text-sm'>
        시즌3 업데이트 이후 캐릭터 동기화를 위해 최소 1회 캐릭터에 접속해주세요.
      </span>
    </main>
  </>
)

const MemberCard = async ({ members, session }: OwnProps) => {
  const sortedMembers = moveUsernameToFront(members, session.user.name)

  return (
    <ul className='flex gap-4 w-full h-full flex-wrap justify-center sm:justify-normal overflow-y-auto'>
      {await Promise.all(
        sortedMembers.map(async m => {
          const data = (await getCharacterProfile(m.registeredBy)) as ChaListInterface

          const isCurrentUser = session.user.name === m.username
          const cardClassName = `rounded flex flex-col p-4 w-[16.5rem] h-[20rem] justify-between ${
            isCurrentUser ? 'border-primary-accent border-2 shadow' : 'border'
          }`

          return (
            <li key={m.userId} className={cardClassName}>
              {data ? <MemberCardContent data={data} m={m} session={session} /> : <ErrorCard m={m} session={session} />}
            </li>
          )
        })
      )}
    </ul>
  )
}

export default MemberCard
