import { deleteRaid } from '@/api/firebase'
import { useRouter } from 'next/navigation'

interface Ownprops {
  setIsOpen: (arg0: boolean) => void
  channelId: string
  scheduleId: string
}

export default function DeleteModal({ setIsOpen, channelId, scheduleId }: Ownprops) {
  const router = useRouter()

  const handleDeleteBtn = async () => {
    await deleteRaid(channelId, scheduleId)
    setIsOpen(false)
    router.push(`http://localhost:3000/${channelId}/dashboard`)
  }

  return (
    <>
      <div className='absolute z-40 w-screen h-full bg-gray-900/30 top-0 left-0' onClick={() => setIsOpen(false)} />
      <div className='z-50 border fixed top-1/2 left-1/2 w-[15rem] bg-light dark:bg-dark -translate-x-1/2 -translate-y-1/2 shadow-xl rounded flex flex-col p-4 space-y-4'>
        <h1 className='text-center'>정말 삭제하시겠습니까?</h1>
        <div className='flex w-full justify-center gap-4'>
          <button
            onClick={() => setIsOpen(false)}
            className='truncate px-2 py-1 transition rounded border hover:bg-primary-gray/50 text-sm font-medium '
          >
            취소
          </button>
          <button
            onClick={() => handleDeleteBtn()}
            className='truncate px-2 py-1 transition rounded border bg-secondary-accent hover:bg-secondary-accent/80 text-sm font-medium text-dark'
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  )
}
