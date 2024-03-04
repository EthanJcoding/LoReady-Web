import Image from 'next/image'
import Label from '../Label'
import { LuClock3 } from 'react-icons/lu'
import { SlPeople } from 'react-icons/sl'

interface Ownprops {
  boss: string
  leader: string
  date: string
  headCount: string
}

export default function CompactRaidCard({ boss, leader, date, headCount }: Ownprops) {
  return (
    <section className='relative flex flex-col justify-center gap-2 h-[105px] w-[480px] bg-white p-3 rounded-md shadow-sm'>
      <Image
        className='absolute w-full h-full inset-0 clip-path-polygon object-cover object-center rounded-md'
        src={setBossImage(boss)}
        alt='boss_img'
        width={400}
        height={400}
      />
      <div className='flex gap-2'>
        <h6 className='text-gray-400'>보스</h6>
        <span>{boss}</span>
        <Label color='black' label='Hard' />
      </div>
      <div className='flex gap-2'>
        <h6 className='text-gray-400'>공대장</h6>
        <span>{leader}</span>
      </div>
      <div className='flex items-center gap-2'>
        <LuClock3 />
        <span>{date}</span>
        <SlPeople className='ml-3' />
        <span>{headCount}</span>
      </div>
    </section>
  )
}

function setBossImage(boss: string) {
  switch (boss) {
    case '아브렐슈드':
      return '/images/mockIMG.jpg'
    default:
      return '/images/mockIMG.jpg'
  }
}
