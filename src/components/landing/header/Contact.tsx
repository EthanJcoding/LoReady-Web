import { FaDiscord } from 'react-icons/fa'

export default function Contact() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_DISCORD_CHANNEL}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center justify-center w-[35px] h-[35px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-full hover:scale-125 transition'
    >
      <FaDiscord color='white' size={20} />
    </a>
  )
}
