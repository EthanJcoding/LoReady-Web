'use client'

import { useScheduleFilterStore } from '@/stores/scheduleFilter'
import { BsCheckCircleFill } from 'react-icons/bs'

export default function MyScheduleToggle() {
  const { isShowMySchedule, setIsShowMySchedule } = useScheduleFilterStore(state => state)

  return (
    <button className='flex items-center gap-1' onClick={setIsShowMySchedule}>
      <span className={`${isShowMySchedule ? 'text-primary-accent' : 'text-gray-300'} text-xl`}>
        <BsCheckCircleFill />
      </span>
      <span className={`${isShowMySchedule ? 'font-medium' : 'font-normal'} pt-[1px]`}>내 일정만 보기</span>
    </button>
  )
}
