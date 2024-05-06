import { ProfileInterface } from '@/types/ProfileInterface'

interface Ownprops {
  ArmoryProfile: ProfileInterface
}

export default function ProfileSummary({ ArmoryProfile }: Ownprops) {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>서버</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>{ArmoryProfile.ServerName}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>전투</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>Lv. {ArmoryProfile.CharacterLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate'>원정대</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>Lv. {ArmoryProfile.ExpeditionLevel}</div>
      </div>
      <div className='flex w-full space-x-2 items-center'>
        <div className='border rounded px-1 text-sm font-semibold truncate '>아이템</div>
        <div className='2xl:text-lg text-sm font-semibold truncate'>Lv. {ArmoryProfile.ItemAvgLevel}</div>
      </div>
    </div>
  )
}
