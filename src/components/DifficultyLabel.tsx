interface Ownprops {
  label: string
  color?: Color | null
}

type Color = 'red' | 'yellow' | 'black' | 'blue' | 'green'

export default function DifficultyLabel({ label, color }: Ownprops) {
  return (
    <div
      className={`flex items-center min-w-5 h-5 px-2 py-1 ${
        color ? changeBgColor(color) : setLableColor(label)
      } text-white text-xs text-center align-middle rounded-full`}
    >
      {label}
    </div>
  )
}

function changeBgColor(color: Color) {
  switch (color) {
    case 'red':
      return 'bg-red-600'
    case 'yellow':
      return 'bg-amber-400'
    case 'black':
      return 'bg-neutral-950'
    case 'blue':
      return 'bg-sky-500'
    case 'green':
      return 'bg-green-500'
  }
}

function setLableColor(label: string) {
  switch (label) {
    case 'NORMAL':
      return 'bg-neutral-950'
    case 'HARD':
      return 'bg-amber-400'
    case 'HELL':
      return 'bg-red-600'
    default:
      return 'bg-primary-gray'
  }
}
