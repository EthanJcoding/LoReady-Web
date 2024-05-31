interface Ownprops {
  setIsOpen: (arg0: boolean) => void
}

export default function ScheduleDeleteBtn({ setIsOpen }: Ownprops) {
  return (
    <button
      className='h-full px-4 py-1 font-medium hover:bg-secondary-accent/70 rounded-t-lg transition text-sm'
      onClick={() => setIsOpen(true)}
    >
      삭제하기
    </button>
  )
}
