import { getCharacterProfile } from '@/api/lostark/getCharacterProfile'
import { ChaListInterface } from '@/types/characterList'
import { User } from '@/types/users'
import { Session } from 'next-auth'
import Image from 'next/image'

interface Ownprops {
  members: User[]
  session: Session
}

export default async function MemberCard({ members, session }: Ownprops) {
  // const mock = [
  //   {
  //     username: 'junilj',
  //     globalName: '정준일',
  //     userId: '959094399877382195',
  //     channels: ['1209059689657016371', '1050686760373469234'],
  //     registeredBy: '김뚜띠',
  //     schedules: ['ZEucDBjkQ8cirupY4VqA', 'kReYBq1DA0Bb8RBmiw74']
  //   },
  //   {
  //     channels: ['1209059689657016371'],
  //     registeredBy: '갈릭종짱아찌',
  //     schedules: ['TfpgkFwwVJl0u6dLLBkY', 'pjymNA5Cl0umwFfPJmYD'],
  //     userId: '341095521529626625',
  //     globalName: '주닐',
  //     username: 'junil22'
  //   },
  //   {
  //     schedules: [],
  //     globalName: '이승민',
  //     updated: '2024-05-28 13:15:00',
  //     userId: '987693767488319558',
  //     username: 'sm2ee',
  //     channels: ['1209059689657016371'],
  //     registeredBy: '두두츤츤'
  //   },
  //   {
  //     schedules: [],
  //     globalName: '이승민',
  //     updated: '2024-05-28 13:15:00',
  //     userId: '987693767488319558',
  //     username: 'sm2ee',
  //     channels: ['1209059689657016371'],
  //     registeredBy: '두두츤츤'
  //   },
  //   {
  //     schedules: [],
  //     globalName: '이승민',
  //     updated: '2024-05-28 13:15:00',
  //     userId: '987693767488319558',
  //     username: 'sm2ee',
  //     channels: ['1209059689657016371'],
  //     registeredBy: '두두츤츤'
  //   }
  // ]

  return (
    <>
      <ul className='flex gap-4 w-full h-full flex-wrap justify-center sm:justify-normal overflow-scroll'>
        {members.map(async m => {
          const data = (await getCharacterProfile(m.registeredBy)) as ChaListInterface

          return (
            <li
              key={m.userId}
              className={
                'rounded flex flex-col p-4 w-[16.5rem] h-[20rem] space-y-2 ' +
                (session.user.name === m.username ? `border-primary-accent border-2 shadow ` : `border `)
              }
            >
              <header className='flex flex-col justify-center border-b space-y-2 mb-2'>
                <div className='flex w-full justify-center'>
                  <Image
                    src={data.CharacterImage}
                    width={150}
                    height={150}
                    alt='캐릭터'
                    className='w-24 h-24 object-none object-top rounded-full shadow'
                  />
                </div>

                <span className='text-primary-accent text-2xl font-medium text-center'>{m.registeredBy}</span>
                <span className='text-sm font-medium text-center'>{m.globalName}</span>
              </header>
              <main className='flex w-full justify-between text-xs '>
                <section className='space-y-2'>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>서버</span>
                    <span className='font-medium'>{data.ServerName}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>원정대</span>
                    <span className='font-medium'>{data.ExpeditionLevel}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>길드</span>
                    <span className='font-medium'>{data.GuildName}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>칭호</span>
                    <span className='font-medium'>{data.Title}</span>
                  </div>
                </section>
                <section className='space-y-2'>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>레벨</span>
                    <span className='font-medium'>{data.ItemAvgLevel}</span>
                  </div>
                  <div className='flex w-full gap-2 items-center'>
                    <span className='border rounded-xl px-2 font-semibold'>직업</span>
                    <span className='font-medium'>{data.CharacterClassName}</span>
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
