import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Product } from '../products/productsTypes'; // Assuming this is the type for products

export const useWishlistStore = defineStore('wishlistStore', () => {
  // Wishlist data
  const wishlist: Ref<Product[]> = ref([]);

  // Add a product to the wishlist
  const addToWishlist = (product: Product) => {
    if (!wishlist.value.some(item => item.id === product.id)) {
      wishlist.value.push(product);
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = (productId: number) => {
    wishlist.value = wishlist.value.filter(item => item.id !== productId);
  };

  // Clear the wishlist
  const clearWishlist = () => {
    wishlist.value = [];
  };

  // Check if a product is in the wishlist
  const isProductInWishlist = (productId: number): boolean => {
    return wishlist.value.some(item => item.id === productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isProductInWishlist
  };
});
