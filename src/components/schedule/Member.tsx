interface Ownprops {
  character?: string
  isActive?: boolean
}

export default function Member({ character, isActive = true }: Ownprops) {
  return (
    <li
      className={`flex justify-center items-center px-2 border-t border-secondary-gray/50 overflow-hidden ${
        isActive ? '' : 'bg-gray-300'
      }`}
    >
      <span className='truncate'>{character}</span>
    </li>
  )
}
