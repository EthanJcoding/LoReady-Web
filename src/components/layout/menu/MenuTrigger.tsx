import { FaBars } from 'react-icons/fa6'

export default function MenuTrigger() {
  return (
    <button className='absolute z-50 right-12 bottom-12 2xl:hidden peer h-14 w-14 rounded-full bg-primary-accent hover:bg-cyan-600 focus:bg-cyan-600 focus:scale-90 transition shadow-md'>
      <span className='text-white'>
        <FaBars className='m-auto w-6' />
      </span>
    </button>
  )
}
