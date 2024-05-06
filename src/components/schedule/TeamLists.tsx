import { Character } from '@/types/schedule'
import Member from './Member'

interface Ownprops {
  members: Character[]
  capacity: string
}

export default function TeamLists({ members, capacity }: Ownprops) {
  const blanks: undefined[] = [...Array(4 - members.length)]

  return (
    <ul className='flex-1 grid grid-rows-4'>
      {members.map(member => (
        <Member key={member.userId} character={member.character} />
      ))}
      {blanks.map((_, idx) => (
        <Member key={idx} isActive={capacity === '4' ? idx < blanks.length - 2 : true} />
      ))}
    </ul>
  )
}
