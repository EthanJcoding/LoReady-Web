import { getChallengeGuardian } from '@/api/lostark/getChallengeGuardian'

export default async function GuaridanContent() {
  const { Raids } = await getChallengeGuardian()

  return (
    <div className='card flex flex-col gap-3'>
      <div className='text-lg font-medium'>
        이번 주 도전
        <span className='text-primary-accent pl-1'>가디언 토벌</span>
      </div>
      <ul className='flex-1 flex flex-col gap-3'>
        {Raids.map((raid, idx) => (
          <li
            key={idx}
            className='flex flex-col h-full justify-end text-white rounded-md bg-dark bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${raid.Image})` }}
          >
            <span className='p-3 text-lg font-semibold'>{raid.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
