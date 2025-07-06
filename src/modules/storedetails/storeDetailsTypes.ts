export type ProductCategory = {
    id: number;
    name: string;
    created_at: string;
    modified_at: string;
    deleted_at: string | null;
  };
  
  export type Store = {
    logoUrl: string;
    id: number;
    name: string;
    telephone: string;
    email: string;
    address: string;
    subscription_expiry: string | null;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    product_categories: ProductCategory;
  };
  
  export type StoreList = Store[];
  