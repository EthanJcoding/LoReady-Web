import { Character } from '@/types/Schedule'
import Member from './Member'

interface Ownprops {
  members: Character[]
}

export default function TeamLists({ members }: Ownprops) {
  const blanks: undefined[] = [...Array(4 - members.length)]

  return (
    <ul className='flex-1 grid grid-rows-4'>
      {members.map(member => (
        <Member key={member.userId} character={member.character} />
      ))}
      {blanks.map((_, idx) => (
        <Member key={idx} />
      ))}
    </ul>
  )
}
