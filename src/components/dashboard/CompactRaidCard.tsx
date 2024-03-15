import Image from 'next/image'
import DifficultyLabel from '../DifficultyLabel'
import { LuClock3 } from 'react-icons/lu'
import { SlPeople } from 'react-icons/sl'

interface Ownprops {
  boss: string
  rank: string
  leader: string
  date: string
  headCount: string
}

export default function CompactRaidCard({ boss, rank, leader, date, headCount }: Ownprops) {
  return (
    <section className='relative flex bg-white text-dark p-3 rounded-md shadow-sm'>
      <div className='absolute w-full h-full inset-0 clip-path-polygon rounded-md overflow-hidden'>
        <Image
          className='w-full h-full absolute left-1/3 object-cover object-center'
          src={`/images/raid/${setBossImage(boss)}`}
          alt='boss_img'
          width={400}
          height={400}
        />
      </div>
      <div className='flex flex-col gap-1 z-10 overflow-hidden'>
        <div className='flex gap-2'>
          <h6 className='flex-none text-primary-gray'>보스</h6>
          <div className='flex-1 flex items-center gap-1 overflow-hidden'>
            <span className='truncate'>{boss}</span>
            <DifficultyLabel difficulty={rank} />
          </div>
        </div>
        <div className='flex gap-2'>
          <h6 className='flex-none text-primary-gray'>공대장</h6>
          <span className='truncate'>{leader}</span>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <LuClock3 className='flex-none text-primary-gray' />
            <span>{date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <SlPeople className='flex-none text-primary-gray' />
            <span>{headCount}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function setBossImage(boss: string) {
  switch (boss) {
    case '아브렐슈드':
      return 'abrelshud.png'
    case '쿠크세이튼':
      return 'koukusaton.png'
    case '카멘':
      return 'kamen.png'
    case '발탄':
      return 'valtan.png'
    case '비아키스':
      return 'biackiss.png'
    case '일리아칸':
      return 'illiakan.png'
    case '카양겔':
      return 'kayangel.png'
    default:
      return 'mokoko.png'
  }
}
