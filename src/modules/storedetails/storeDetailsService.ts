// import { storeStore } from './storeStore';
import { useMutation } from '@tanstack/vue-query';
// import { storeData, HealthPrograms } from './storeTypes';
import { useNotification } from '@/composables';
const { error, success } = useNotification();
import {
    getstores
} from './storeDetailsAPI';

const usestoreService = () => {
//   const storeDataStoreObj = storeStore();

  function fetchStores() {
    return useMutation({
      mutationFn: getstores,
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
    fetchStores
  };
};

export default usestoreService;
