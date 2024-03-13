import { FaDiscord } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'

interface Ownprops {
  name: string
  character: string
  level: string
  classType: string
}

export default function UserInfoCard({ name, character, level, classType }: Ownprops) {
  const textTruncateStyle = 'text-center truncate'

  console.log('name', name)

  return (
    <li className='flex h-9 items-center justify-around rounded-md shadow-sm border'>
      <div className='flex justify-center items-center basis-1/12'>
        <FaDiscord />
      </div>
      <p className={`${textTruncateStyle} basis-2/12`}>{name}</p>
      <p className={`${textTruncateStyle} basis-4/12`}>{character}</p>
      <p className={`${textTruncateStyle} basis-3/12`}>{level}</p>
      <p className={`${textTruncateStyle} basis-3/12`}>{classType}</p>
      <div className='flex justify-center items-center basis-1/12'>
        <GoGear />
      </div>
    </li>
  )
}
