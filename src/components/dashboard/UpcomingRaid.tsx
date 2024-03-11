import RaidList from './RaidList'

export default function UpcomingRaid() {
  return (
    <div className='card basis-1/3 bg-secondary-accent/50 dark:bg-primary-accent/80'>
      <div className='pb-4 text-xl'>다가오는 레이드</div>
      <ul className='flex flex-col gap-3'>
        <RaidList />
      </ul>
    </div>
  )
}
