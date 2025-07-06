// stores/cartStore.ts
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Product } from '../products/productsTypes'; // Assuming this is the type for products

export const useCartStore = defineStore('cartStore', () => {
  // Cart data
  const cart: Ref<Product[]> = ref([]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    if (!cart.value.some(item => item.id === product.id)) {
      cart.value.push(product);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };

  // Clear the cart
  const clearCart = () => {
    cart.value = [];
  };

  // Check if a product is in the cart
  const isProductInCart = (productId: number): boolean => {
    return cart.value.some(item => item.id === productId);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isProductInCart
  };
});
