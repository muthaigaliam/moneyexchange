<template>
  <nav class="bg-orange-500 px-4 py-1 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-lg">
    <router-link to="/">
      <img src="@/assets/Pasted.png" alt="Chap Chap E-Mall" class="h-24 w-full cursor-pointer" />
    </router-link>
    <!-- <div class="relative w-1/3">
      <input
        type="text"
        placeholder="Search Products"
        class="p-2 text-sm  w-full pr-10"
      />
      <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
    </div> -->
    <div class="flex gap-6 items-center text-sm text-white">
      <!-- Sign Up/Login Button -->
      <button 
        @click="openAuthSidebar"
        class="px-4 py-2 rounded-lg bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white">
        {{ authStore.isLoggedIn ? 'Account' : "Sign up/Login" }}
      </button>
    
      <!-- Wishlist Button -->
      <button 
        @click="openSidebar('wishlist')" 
        class="px-4 py-2 rounded-lg bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white">
        Wish List ({{ wishlist.length }})
        <!-- {{ wishlist }} -->
      </button>
    
      <!-- Cart Button -->
      <button 
        @click="openSidebar('cart')" 
        class="px-4 py-2 rounded-lg bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white">
        My Cart({{ cart.length }})
      </button>
    </div>
  </nav>

 

<!-- Auth Sidebar (Appears from the Right) -->


<!-- Wishlist & Cart Sidebar (Existing) -->
<div class="relative mt-16">
  <div
    ref="sidebarRef"
    v-if="isSidebarOpen && ['wishlist', 'cart', 'auth'].includes(sidebarActive)"
    class="fixed top-16 right-0 h-[85vh] w-1/4 bg-white shadow-lg mt-7 rounded-l-2xl overflow-y-auto transition-transform duration-300 transform z-40"
    :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4 flex justify-between" v-if="sidebarActive !== 'auth'">
        {{ sidebarActive === 'wishlist' ? 'Your Wishlist' : 'Shopping Cart' }}
        <button @click="closeSidebar" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
      </h2>

   <!-- Auth Sidebar -->
   <div v-if="sidebarActive === 'auth'">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">
        {{ authStore.isLoggedIn ? 'Account' : 'Login / Sign Up' }}
      </h2>
      <button @click="closeSidebar" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
    </div>

    <div v-if="authStore.isLoggedIn" class="mt-6 p-4 text-center">
      <p class="text-gray-800 text-lg font-semibold mb-4">
        You are logged in!
      </p>
      <button
        @click="authStore.logout"
        class="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
      >
        Log out
      </button>
    </div>
    

    <AuthSideBar
      v-else
      :isSidebarOpen="isSidebarOpen"
      :activeSidebar="sidebarActive"
      :closeSidebar="closeSidebar"
    />
  </div>
  


      <!-- Wishlist Content -->
      <div v-if="sidebarActive === 'wishlist'">
        <ul v-if="wishlist.length">
          <!-- <li
            v-for="item in wishlist"
            :key="item.id"
            class="flex items-center gap-4 border-b py-3"
          >
            <img
              :src="'https://chapchap.marshsoft.org' + item.images[0].url"
              class="w-14 h-14 rounded-lg shadow-md"
            />
            <div class="flex-1">
              <p class="font-semibold">{{ item.name }}</p>
              <button class="text-blue-500 text-sm">Move to Cart</button>
            </div>
            <button class="text-red-500 hover:text-red-700 text-xl">&times;</button>
          </li> -->
          <WishlistSidebar
            v-if="sidebarActive === 'wishlist'"
            :wishlist="wishlist"
            :closeSidebar="closeSidebar"
          />

        </ul>
        <p v-else class="text-gray-500 text-center py-4">Your wishlist is empty.</p>
      </div>

      <!-- Cart Content -->
      <div v-if="sidebarActive === 'cart'">
        <ul v-if="cart.length">
          <!-- <li
            v-for="item in cart"
            :key="item.id"
            class="flex items-center gap-4 border-b py-3"
          >
            <img :src="item.image" class="w-14 h-14 rounded-lg shadow-md" />
            <div class="flex-1">
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-gray-600 text-sm">${{ item.price }}</p>
            </div>
            <button class="text-red-500 hover:text-red-700 text-xl">&times;</button>
          </li> -->
          <Cart/>
        </ul>
        <p v-else class="text-gray-500 text-center py-4">Your cart is empty.</p>

        <div v-if="cart.length" class="mt-4">
          <p class="text-lg font-semibold">Total: ${{ cartTotal }}</p>
          <button class="bg-orange-500 text-white w-full py-2 rounded-lg mt-2"
          @click="checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref, computed,onMounted,onUnmounted } from "vue";
import AuthSideBar from "../auth/AuthSideBar.vue";
import WishlistSidebar from "../wishlist/Wishlist.vue";
import Cart from "../cart/Cart.vue";
// Props passed down from parent
import { useRoute, useRouter } from 'vue-router';

import { useWishlistStore } from '../wishlist/WishlistStore';
import { useCartStore } from '../cart/CartStore';
import { useAuthStore } from '../auth/AuthStore';
import Checkout from "../checkout/Checkout.vue";
const router = useRouter();
const authStore = useAuthStore();
  const wishlistStore = useWishlistStore();  // Access the store
  const cartStore = useCartStore();  // Access the store
  
  // Directly use a computed property to get the wishlist from the store
  const wishlist = computed(() => wishlistStore.wishlist);  // This ensures reactivity
  const cart = computed(() => cartStore.cart);  // This ensures reactivity
  

// defineProps<{
//   wishlist: {
//     id: number;
//     name: string;
//     image: string;
//   }[];
//   onToggleWishlist?: () => void;
// }>();

// const emit = defineEmits<{
//   (e: 'remove', id: number): void;
// }>();

// function handleRemove(id: number) {
//   console.log('clicked',id)
//   emit('remove', id);
// }

const isModalOpen = ref(false);
const isSidebarOpen = ref(false);
const activeSidebar = ref<'auth' | null>(null);
const sidebarActive = ref<'wishlist' | 'cart' |'auth'| null>(null);
const isLogin = ref(true);
const email = ref("");
const password = ref("");


function openAuthSidebar() {
  activeSidebar.value = 'auth';   // Optional (if you use it elsewhere)
  sidebarActive.value = 'auth';   // This is what your template checks
  isSidebarOpen.value = true;
  isLogin.value = true;
}


function checkout() {
  // Accessing the computed cart value with .value
  const productIds = cart.value.map(product => product.id);

  // Redirecting to the checkout route with the product IDs as query params
  router.push({
    name: 'checkout',
    query: { productIds: productIds.join(',') }  // Joining IDs as a comma-separated string
  });
}






function closeSidebar() {
  isSidebarOpen.value = false;   // Close the sidebar
  activeSidebar.value = null;    // Reset active sidebar when closing
}

// Local states for Cart
// const cart = ref([
//   { id: 1, name: "Laptop", price: 1200, image: "https://via.placeholder.com/50" },
//   { id: 2, name: "Headphones", price: 150, image: "https://via.placeholder.com/50" }
// ]);

const cartTotal = computed(() => 
  cart.value.reduce((sum, item) => sum + (item.gross_price || 0), 0)
);


// Method to open sidebar for wishlist or cart
const openSidebar = (type: 'wishlist' | 'cart') => {
  sidebarActive.value = type;
  isSidebarOpen.value = true;
};

const sidebarRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (sidebarRef.value && !sidebarRef.value.contains(event.target as Node)) {
    closeSidebar();
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
/* Sidebar animations */
.transform {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
.translate-x-full {
  transform: translateX(100%);
}
</style>
