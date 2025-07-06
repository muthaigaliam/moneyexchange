import { Http } from '@/http';

import type {
  Product
} from './HomeViewTypes';


export async function getProducts(): Promise<Product | undefined> {
  return await Http.get<Product>(
    '/products',
    {},
    {}
  );
}