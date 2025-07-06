// import { storeStore } from './storeStore';
import { useMutation } from '@tanstack/vue-query';
// import { storeData, HealthPrograms } from './storeTypes';
import { useNotification } from '@/composables';
const { error, success } = useNotification();
import {
    getProducts
} from './HomeViewAPI';

const useproductService = () => {
//   const storeDataStoreObj = storeStore();


  function fetchProducts() {
    return useMutation({
      mutationFn: getProducts,
      onSuccess: (data) => {
        console.log('Fetched data:', data);
        // storeDataStoreObj.setstoreData(data);
      },
      onError: (error) => {
        console.error('Error fetching store data:', error);
      }
    });
  }
 

  return {
    fetchProducts
  };
};

export default useproductService;
