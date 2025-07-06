<template>
    <div>
      <ul v-if="cart.length">
        <li
          v-for="item in cart"
          :key="item.id"
          class="flex items-center gap-4 border-b py-3"
        >
          <img
            :src="'https://chapchap.marshsoft.org' + item.images[0].url"
            class="w-14 h-14 rounded-lg shadow-md"
          />
          <div class="flex-1">
            <p class="font-semibold">{{ item.name }}</p>
          </div>
          <!-- REMOVE BUTTON -->
          <button
            class="text-red-500 hover:text-red-700 text-xl"
            @click="removeFromCart(item.id)"
          >
            &times;
          </button>
        </li>
      </ul>
      <p v-else class="text-gray-500 text-center py-4">Your cart is empty</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from './CartStore';
  
  const cartStore = useCartStore(); // Access the cart store
  
  const cart = cartStore.cart; // Access cart from the store
  
  function removeFromCart(id: number) {
    cartStore.removeFromCart(id); // Remove item from the cart
  }
  </script>
  