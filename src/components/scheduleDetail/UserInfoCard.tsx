import { Draggable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'

interface Ownprops {
  name: string
  character: string
  level: string
  classType: string
  index: number
}

export default function UserInfoCard({ name, character, level, classType, index }: Ownprops) {
  const textTruncateStyle = 'text-center truncate'

  console.log('test', name)

  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true)
    }
  }, [])

  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <li
          className='flex h-9 items-center justify-around rounded-md shadow-sm border'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  )
}
