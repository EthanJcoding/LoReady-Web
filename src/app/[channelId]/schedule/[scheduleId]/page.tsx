import { getScheduleData } from '@/api/firebase'
import RaiderInfo from '@/components/scheduleDetail/RaiderInfo'
import Raiders from '@/components/scheduleDetail/Raiders'
import { RaidType, RaiderType } from '@/types/raid'
import setRaidersData from '@/utils/setRaidersData'

export default async function ScheduleDetail() {
  let raidType: RaidType = '8인레이드'

  const scheduleData = await getScheduleData('57FNJZW3G0hI2hXcVK1v')
  if (scheduleData) {
    raidType = scheduleData.raidType
  }

  return (
    <div className='flex-1 flex gap-5'>
      <Raiders scheduleData={scheduleData} raidType={raidType} />
      <RaiderInfo />
    </div>
  )
}
