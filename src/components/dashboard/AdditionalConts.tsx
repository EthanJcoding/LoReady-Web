import AbyssContent from './AbyssContent'
import GuaridanContent from './GuaridanContent'

export default function AdditionalConts() {
  return (
    <div className='flex-1 grid grid-cols-1 grid-rows-2 gap-5 xl:grid-cols-2 max-md:hidden'>
      <AbyssContent />
      <GuaridanContent />
    </div>
  )
}
