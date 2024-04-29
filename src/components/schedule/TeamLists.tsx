import { Character } from '@/types/schedule'
import Member from './Member'

interface Ownprops {
  members: Character[]
}

export default function TeamLists({ members }: Ownprops) {
  //TODO: 4인팀일 경우 아래 4칸 배경색 gray
  return (
    <ul className='flex-1 grid grid-rows-4'>
      {members.map(member => (
        <Member key={member.userId} character={member.character} />
      ))}
      {[...Array(4 - members.length)].map((_, idx) => (
        <Member key={idx} />
      ))}
    </ul>
  )
}
