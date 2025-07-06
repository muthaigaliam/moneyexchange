import { ElNotification } from 'element-plus';

export function useNotification() {
  return {
    success: (
      message?: string,
      title?: string,
      duration = 15000,
      dangerouslyUseHTMLString = false
    ) => {
      ElNotification({
        type: 'success',
        dangerouslyUseHTMLString,
        title: title ?? 'Success',
        message: message ?? 'Success',
        duration
      });
    },
    error: (
      message?: string,
      title?: string,
      duration = 15000,
      dangerouslyUseHTMLString = false
    ) => {
      ElNotification({
        type: 'error',
        dangerouslyUseHTMLString,
        title: title ?? 'Error',
        message: message ?? 'Error',
        duration
      });
    }
  };
}


// this is a Notifications file