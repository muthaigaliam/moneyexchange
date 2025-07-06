<template>
  <div
    class="relative rounded-2xl bg-white flex flex-col items-center text-center"
  >
    <!-- Wishlist Button -->
    <button
      @click.stop="toggleWishlist"
      :class="{
        'text-red-500': isInWishlist, 
        'text-gray-400': !isInWishlist
      }"
      class="absolute top-3 right-3 transition-colors"
      title="Add to Wishlist"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3.172 5.172a4.004 4.004 0 015.656 0L10 6.343l1.172-1.171a4.004 4.004 0 115.656 5.656L10 17.657l-6.828-6.829a4.004 4.004 0 010-5.656z" />
      </svg>
    </button>

    <!-- Product Image -->
    <img
      :src="image"
      alt="Product"
      class="w-full h-40 object-contain mb-4 rounded-lg bg-gray-50"
    />

    <!-- Product Info -->
    <p class="font-semibold text-base text-gray-800 truncate w-full">{{ title }}</p>
    <p class="text-orange-500 font-medium text-sm mt-2">{{ price }} Ksh</p>

    <!-- View Button -->
    <button
      @click="$emit('view')"
      class="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-all transform hover:scale-105"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{
  image: string;
  title: string;
  price: string;
  buttonText: string;
}>();

const emit = defineEmits(['view', 'wishlist']);

const isInWishlist = ref(false);  // Track if item is in wishlist

// Toggle wishlist state when the button is clicked
const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
  emit('wishlist');  // Emit the wishlist event to update parent state if necessary
};
</script>

<style scoped>
/* Custom styles for hover effects */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}
</style>
