import { getCharacterProfile } from '@/api/lostark/getCharacterProfile'
import { ChaListInterface } from '@/types/characterList'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import Image from 'next/image'
import Setting from './Setting'

interface Ownprops {
  members: User[]
  session: Session
}

const moveUsernameToFront = (members: User[], targetUsername: string) => {
  // 특정 username을 가진 객체의 인덱스를 찾기
  const index = members.findIndex(user => user.username === targetUsername)

  // 만약 해당 객체가 배열에 존재한다면
  if (index !== -1) {
    // 해당 객체를 배열에서 제거하고
    const [targetUser] = members.splice(index, 1)
    // 배열의 첫 번째 위치로 이동시킴
    members.unshift(targetUser)
  }

  return members
}

export default async function MemberCard({ members, session }: Ownprops) {
  const sortedMembers = moveUsernameToFront(members, session.user.name)

  return (
    <>
      <ul className='flex gap-4 w-full h-full flex-wrap justify-center sm:justify-normal overflow-y-scroll'>
        {sortedMembers.map(async m => {
          const data = (await getCharacterProfile(m.registeredBy)) as ChaListInterface

          return (
            <li
              key={m.userId}
              className={
                'rounded flex flex-col p-4 w-[16.5rem] h-[20rem] justify-between ' +
                (session.user.name === m.username ? `border-primary-accent border-2 shadow ` : `border `)
              }
            >
              <header className='flex flex-col justify-center border-b space-y-4 '>
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
                  {session?.user.name === m.username && <Setting registeredBy={m.registeredBy} />}
                </div>

                <span className='text-primary-accent text-xl font-medium text-center'>{m.registeredBy}</span>
                <span className='text-sm font-medium text-center'>{m.globalName}</span>
              </header>
              <main className='flex w-full justify-between text-xs '>
                <section className='space-y-2 w-1/2'>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>서버</span>
                    <span className='font-medium'>{data.ServerName}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>원정대</span>
                    <span className='font-medium'>{data.ExpeditionLevel}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold w-1/2'>길드</span>
                    <span className='font-medium truncate w-full'>{data.GuildName}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold w-1/2'>칭호</span>
                    <span className='font-medium truncate w-full'>{data.Title}</span>
                  </div>
                </section>
                <section className='space-y-2'>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>레벨</span>
                    <span className='font-medium'>{data.ItemAvgLevel}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>직업</span>
                    <span className='font-medium truncate'>{data.CharacterClassName}</span>
                  </div>
                </section>
              </main>
            </li>
          )
        })}
      </ul>
    </>
  )
}
