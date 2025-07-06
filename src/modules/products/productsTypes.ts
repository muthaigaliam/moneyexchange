export type Product = {
  id: number;
  sub_category_id: number;
  store_id: number;
  name: string;
  gross_price: number;
  discount: number;
  net_price: number;
  quantity: number;
  description: string;
  attributes: {
    color: string;
    storage: string;
  };
  created_at: string;
  modified_at: string;
  deleted_at: string | null;
  category_id: number;
  is_featured: boolean;
  images: Image[];
  product_categories: ProductCategory;
  product_sub_categories: ProductSubCategory;
  stores: Store;
};

export type Image = {
  id: number;
  url: string;
  product_id: number;
  created_at: string;
  modified_at: string;
  deleted_at: string | null;
};

export type ProductCategory = {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
  deleted_at: string | null;
};

export type ProductSubCategory = {
  id: number;
  category_id: number;
  name: string;
  created_at: string;
  modified_at: string;
  deleted_at: string | null;
};

export type Store = {
  id: number;
  name: string;
  telephone: string;
  logoUrl: string;
  email: string;
  address: string;
  subscription_expiry: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category_id: number;
  admin_id: number;
};
