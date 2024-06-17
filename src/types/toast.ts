export interface ToastOption {
  type?: ToastType
  duration?: number
}

export type ToastType = 'success' | 'fail' | 'info'
