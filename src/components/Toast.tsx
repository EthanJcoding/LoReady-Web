'use client'

import { useToastStore } from '@/stores/toast'
import { ToastType } from '@/types/toast'
import { IoMdCheckmarkCircleOutline, IoIosInformationCircleOutline } from 'react-icons/io'
import { IoAlertCircleOutline } from 'react-icons/io5'

export default function Toast() {
  const { isShow, message, toastType, toastElKey } = useToastStore(state => state)

  if (!isShow) return

  return (
    <div
      key={toastElKey}
      className={`${setToastStyle(toastType)} 
      w-80 absolute top-10 left-1/2 -translate-x-1/2 p-3 rounded border shadow-sm animate-toast`}
    >
      <div className='flex items-center gap-2'>
        <span className='text-2xl'>{setToastIcon(toastType)}</span>
        <span className='text-sm font-medium'>{message}</span>
      </div>
    </div>
  )
}

function setToastStyle(type: ToastType) {
  switch (type) {
    case 'success':
      return 'border-green-300 bg-green-100/90 text-green-500'

    case 'fail':
      return 'border-pink-300 bg-pink-100/90 text-pink-500'

    case 'info':
      return 'border-sky-300 bg-sky-100/90 text-sky-500'
  }
}

function setToastIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return <IoMdCheckmarkCircleOutline />
    case 'fail':
      return <IoAlertCircleOutline />
    case 'info':
      return <IoIosInformationCircleOutline />
  }
}
