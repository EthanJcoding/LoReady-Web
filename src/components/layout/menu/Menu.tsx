import MenuContent from './MenuContent'
import MenuTrigger from './MenuTrigger'

export default function Menu() {
  return (
    <div className='2xl:hidden flex'>
      <MenuTrigger />
      <MenuContent />
      <div className='z-30 hidden peer-focus:flex fixed top-0 left-0 w-screen h-screen bg-gray-900/30 opacity-0 peer-focus:opacity-100 peer:transition duration-200'></div>
    </div>
  )
}
