import AbyssContent from './AbyssContent'
import GuaridanContent from './GuaridanContent'

export default function AdditionalConts() {
  return (
    <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-5'>
      <AbyssContent />
      <GuaridanContent />
    </div>
  )
}
