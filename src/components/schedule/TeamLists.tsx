import TeamList from './TeamList'

interface Ownprops {
  arr: string[]
}

export default function TeamLists({ arr }: Ownprops) {
  //TODO: 4인팀일 경우 아래 4칸 배경색 gray
  return (
    <ul className='flex-1 grid grid-rows-4'>
      {arr.map((el, idx) => (
        <TeamList key={idx} character={el} />
      ))}
      {[...Array(4 - arr.length)].map((_, idx) => (
        <TeamList key={idx} />
      ))}
    </ul>
  )
}
