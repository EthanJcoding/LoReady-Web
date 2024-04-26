import { ProfileInterface } from '@/types/ProfileInterface'

interface Ownprops {
  ArmoryProfile: ProfileInterface
}

export default function ProfileSummary({ ArmoryProfile }: Ownprops) {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>서버</div>
        <div className='text-lg font-semibold'>{ArmoryProfile.ServerName}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>전투</div>
        <div className='text-lg font-semibold'>Lv. {ArmoryProfile.CharacterLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold'>원정대</div>
        <div className='text-lg font-semibold'>Lv. {ArmoryProfile.ExpeditionLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded p-1 text-sm font-semibold '>아이템</div>
        <div className='text-lg font-semibold'>Lv. {ArmoryProfile.ItemAvgLevel}</div>
      </div>
    </div>
  )
}
