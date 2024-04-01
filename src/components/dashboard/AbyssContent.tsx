import { getChallengeAbyss } from '@/api/lostark/getChallengeAbyss'

export default async function AbyssContent() {
  const data = await getChallengeAbyss()

  return (
    <div className='card flex flex-col gap-3'>
      <div className='text-lg font-medium'>
        이번 주 도전
        <span className='text-primary-accent pl-1'>어비스 던전</span>
      </div>
      <ul className='flex-1 flex flex-col gap-3'>
        {data.map((item, idx) => (
          <li
            key={idx}
            className='flex flex-col justify-center items-center h-full text-center text-white rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${item.Image})` }}
          >
            <span className='text-sm font-medium'>{item.AreaName}</span>
            <span className='text-2xl font-semibold'>{item.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
