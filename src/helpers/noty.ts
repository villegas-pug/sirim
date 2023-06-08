import toast, { Toast, ToastType } from 'react-hot-toast'

const optToast: Partial<Toast> = {
   duration: 4000,
   position: 'bottom-center'
}

export const noty = (type: ToastType, message: string = '') => {
   switch (type) {
   case 'success':
      toast.success(message, { ...optToast })
      break
   case 'loading':
      toast.loading(message, { ...optToast })
      break
   case 'error':
      toast.error(message, { ...optToast })
      break
   }
}
