import CompactRaidCard from '@/components/dashboard/CompactRaidCard'
import PartyList from '@/components/partyList/PartyList'

export default function Schedule() {
  return (
    <div className='flex-1 flex gap-5 flex-wrap overflow-y-scroll overscroll-y-auto'>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='아브렐슈드' date='2024.02.23(금) 22:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='쿠크세이튼' date='2024.02.23(금) 23:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='일리아칸' date='2024.02.23(금) 22:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='발탄' date='2024.02.23(금) 22:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='비아키스' date='2024.02.23(금) 22:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
      <div className='border-solid border-2 h-[260px] rounded-md'>
        <CompactRaidCard boss='카멘' date='2024.02.23(금) 22:00' headCount='8/8' leader='v최강준일v' />
        <PartyList />
      </div>
    </div>
  )
}
