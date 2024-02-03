import { ref, type Ref} from 'vue';

interface Toast {
  id?:  string
  msg?: string
  time?: number
  css?: string
}
const toasts: Ref<Toast[]> = ref([])

export function useToast() {

  const launchToast = ({ msg, time, css = ''} : Toast) => {    
    const id = crypto.randomUUID()
    const toast: Toast = { msg, time, css, id }    
    toasts.value.push(toast);
  };
  
  const hideToast = async(id: string) => {
    const index = toasts.value.findIndex((item) => item.id === id);

    if (index >= 0) {
      toasts.value.splice(index, 1);
    }    
  };

  const hideAllToasts = () => toasts.value = []

  return {
    launchToast, toasts, hideToast, hideAllToasts
  }
}