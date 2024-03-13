import { getScheduleData } from '@/api/firebase'
import RaiderInfo from '@/components/scheduleDetail/RaiderInfo'
import Raiders from '@/components/scheduleDetail/Raiders'
import { RaidType, RaiderType } from '@/types/raid'
import setRaidersData from '@/utils/setRaidersData'

export default async function ScheduleDetail() {
  let raidType: RaidType = '8인레이드'
  let raidersData: RaiderType[] = []
  let firstPartyraidersData: RaiderType[] = []
  let secondPartyraidersData: RaiderType[] = []

  const scheduleData = await getScheduleData('57FNJZW3G0hI2hXcVK1v')
  if (scheduleData) {
    raidType = scheduleData.raidType
    raidersData = await setRaidersData(scheduleData, 'party0')
    firstPartyraidersData = await setRaidersData(scheduleData, 'party1')
    secondPartyraidersData = await setRaidersData(scheduleData, 'party2')
  }

  console.log('info', raidersData)

  return (
    <div className='flex-1 flex gap-5'>
      <Raiders
        raidersData={raidersData}
        firstPartyraidersData={firstPartyraidersData}
        secondPartyraidersData={secondPartyraidersData}
        raidType={raidType}
      />
      <RaiderInfo />
    </div>
  )
}
