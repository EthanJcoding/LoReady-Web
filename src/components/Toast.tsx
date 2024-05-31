'use client'

import { useToastStore } from '@/stores/toast'

export default function Toast() {
  const { isShow, message, toastElKey } = useToastStore(state => state)

  if (!isShow) return

  return (
    <div key={toastElKey} className='absolute top-5 left-1/2 px-10 py-3 bg-white rounded border shadow-md text-sm'>
      {message}
    </div>
  )
}
