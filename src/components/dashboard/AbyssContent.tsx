import { getChallengeAbyss } from '@/api/lostark/getChallengeAbyss'

export default async function AbyssContent() {
  const data = await getChallengeAbyss()

  return (
    <div className='card flex flex-col gap-3'>
      <div className='text-lg'>이번 주 도전 어비스 던전</div>
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
