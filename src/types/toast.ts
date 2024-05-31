export interface ToastOption {
  type?: ToastType
  duraition?: number
}

export type ToastType = 'success' | 'fail' | 'info'
