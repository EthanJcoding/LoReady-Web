import { FaDiscord } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'

interface Ownprops {
  name: string
  character: string
  level: string
  classType: string
}

export default function UserInfoCard({ name, character, level, classType }: Ownprops) {
  return (
    <li className='flex items-center justify-around rounded-md shadow-sm border'>
      <FaDiscord />
      <p>{name}</p>
      <p>{character}</p>
      <p>{level}</p>
      <p>{classType}</p>
      <GoGear />
    </li>
  )
}
