import AbyssContent from './AbyssContent'
import GuaridanContent from './GuaridanContent'

export default function AdditionalConts() {
  return (
    <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-5 max-lg:grid-cols-1 max-sm:hidden'>
      <AbyssContent />
      <GuaridanContent />
    </div>
  )
}
