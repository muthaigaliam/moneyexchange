<template>
    <div>
      <ul v-if="wishlist.length">
        <li v-for="item in wishlist" :key="item.id" class="flex items-center gap-4 border-b py-3">
          <img :src="'https://chapchap.marshsoft.org' + item.images[0].url" class="w-14 h-14 rounded-lg shadow-md" />
          <div class="flex-1">
            <p class="font-semibold">{{ item.name }}</p>
            <button class="text-blue-500 text-sm" @click="moveToCart(item)">
              Move to Cart
            </button>
          </div>
          <button class="text-red-500 hover:text-red-700 text-xl" @click="removeFromWishlist(item.id)">
            &times;
          </button>
        </li>
      </ul>
      <p v-else class="text-gray-500 text-center py-4">Your wishlist is empty</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useWishlistStore } from './WishlistStore';
  import { useCartStore } from '../cart/CartStore';
  import { Product } from '../products/productsTypes';
  
  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();
  
  const wishlist = wishlistStore.wishlist;
  
  function removeFromWishlist(id: number) {
    wishlistStore.removeFromWishlist(id);
  }
  
  function moveToCart(product: Product) {
  console.log("Before adding to cart", cartStore.cart);
  cartStore.addToCart(product);
  console.log("After adding to cart", cartStore.cart);
  
  wishlistStore.removeFromWishlist(product.id);
  console.log("Wishlist after removal", wishlistStore.wishlist);
}

  </script>
  