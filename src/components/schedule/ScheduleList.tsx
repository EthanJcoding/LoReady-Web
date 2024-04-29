import CompactRaidCard from '../dashboard/CompactRaidCard'
import TeamLists from './TeamLists'

export default function ScheduleList() {
  const arr = ['v최강준일v', 'loreadyisgood']
  const arr2 = ['이세계관에서는내가제일강함']

  return (
    <li className='h-80 flex flex-col bg-white shadow-md shadow-primary-gray/5 border border-secondary-gray/50 rounded-md overflow-hidden'>
      <CompactRaidCard boss='아브렐슈드' rank='HARD' leader='v최강준일v' date='2024-04-30 19:53:00' headCount='4 / 8' />
      <div className='h-full grid grid-cols-2 border-t border-inherit text-dark'>
        <div className='flex flex-col border-r border-inherit bg-pink-50'>
          <span className='px-2 py-1 text-center font-semibold bg-pink-100'>Team 1</span>
          <TeamLists arr={arr} />
        </div>
        <div className='flex flex-col bg-blue-50'>
          <span className='px-2 py-1 text-center font-semibold bg-blue-100'>Team 2</span>
          <TeamLists arr={arr2} />
        </div>
      </div>
    </li>
  )
}
