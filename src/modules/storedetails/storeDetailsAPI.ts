import { Http } from '@/http';

import type {
    StoreList
} from './storeDetailsTypes';

export async function getstores(): Promise<StoreList | undefined> {
    return await Http.get<StoreList>(
      '/stores',
      {},
      {}
    );
  }