// import { storeStore } from './storeStore';
import { useMutation } from '@tanstack/vue-query';
// import { storeData, HealthPrograms } from './storeTypes';
import { useNotification } from '@/composables';
const { error, success } = useNotification();
import {
    getProductforSpecificStore
} from './productAPI';

const useProductService = () => {
//   const storeDataStoreObj = storeStore();

function fetchProductforSpecificStore() {
    return useMutation({
      mutationFn: (storeId: string) => getProductforSpecificStore(storeId), 
      onSuccess: (data) => {
      },
      onError: (err) => {
        console.error('Error fetching store data:', err);
        error('Failed to fetch store data');
      }
    });
  }
 

  return {
    fetchProductforSpecificStore
  };
};

export default useProductService;
