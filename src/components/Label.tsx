interface Ownprops {
  label: string
  color?: Color
}

type Color = 'red' | 'yellow' | 'black' | 'blue' | 'green'

export default function Label({ label, color = 'red' }: Ownprops) {
  return (
    <div
      className={`flex items-center min-w-5 h-5 px-2 py-1 ${changeBgColor(color)}
       text-white text-xs text-center align-middle rounded-full`}
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
