interface Ownprops {
  character?: string
}

export default function TeamList({ character }: Ownprops) {
  return (
    <li className='flex justify-center items-center px-2 border-t border-secondary-gray/50 overflow-hidden'>
      <span className='truncate'>{character}</span>
    </li>
  )
}
