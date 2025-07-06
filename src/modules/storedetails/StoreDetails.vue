<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from '../navbar/Navbar.vue';
import { useRouter } from 'vue-router';
import usestoreService from './storeDetailsService';
import type { StoreList } from './storeDetailsTypes';

const router = useRouter();
const activeCategory = ref<string>('Electronics');

const { fetchStores } = usestoreService();
const {
  data: storeData,
  isSuccess: storeDataIsSuccess,
  isPending: storeDataIsPending,
  mutate: fetchStoreMutate
} = fetchStores();

const categories = computed(() => {
  if (!storeData.value) return [];
  const uniqueCategories = new Set<string>();

  storeData.value.forEach(store => {
    if (store.product_categories && store.product_categories.name) {
      const categoryName = store.product_categories.name;
      if (categoryName !== 'Services' && categoryName !== 'Restaurants') {
        uniqueCategories.add(categoryName);
      }
    }
  });

  return Array.from(uniqueCategories);
});

const storeList = ref<StoreList>([]);

onMounted(() => {
  getStores();
});

function getStores() {
  fetchStoreMutate(undefined, {
    onSuccess: (data) => {
      if (data) {
        console.log('Fetched Store Data:', data);
        storeList.value = data;
      }
    },
    onError: (error) => {
      console.error('Error fetching stores:', error);
    }
  });
}

const filteredStores = computed(() => {
  return storeList.value.filter(store => store.product_categories?.name === activeCategory.value);
});

const goToStoreDetails = (storeId: number) => {
  router.push({ path: `/store/${storeId}` });
};


const goBack = () => {
  router.back();
};

const wishlist = ref<any[]>([]); 
const addToWishlist = (product: any) => {
const exists = wishlist.value.find(p => p.id === product.id);
if (!exists) wishlist.value.push(product);
};
</script>

<template>
  <Navbar :wishlist="wishlist" 
   />
  <div class="p-6">
    <div class="flex items-center mb-6 py-6">
      <button @click="goBack" class="text-orange-500 text-md hover:text-orange-600 flex items-center mr-4">
        ← Back
      </button>
      <h1 class="text-xl font-bold text-center flex-1">List of Stores</h1>
    </div>   
    
    <div class="flex gap-4 py-4 px-8 bg-gray-100 text-sm justify-between">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="activeCategory = category"
        :class="activeCategory === category ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="storeDataIsPending" class="text-center py-6">Loading stores...</div>
    <div v-else-if="!storeDataIsSuccess" class="text-center py-6 text-red-500">Failed to load stores</div>
    <div v-else class="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <div 
        v-for="store in filteredStores" 
        :key="store.id" 
        class="p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
      >
      <img   :src="store.logoUrl ? 'https://chapchap.marshsoft.org' + store.logoUrl : 'https://via.placeholder.com/100'" />
        <h2 class="text-xl font-semibold">{{ store.name }}</h2>
        <p class="text-gray-500 text-sm">{{ store.address }}</p>
        <p class="text-sm text-gray-600">{{ store.telephone }}</p>
        <button 
          class="mt-3 bg-orange-500 text-white px-4 py-1 rounded-lg"
          @click="goToStoreDetails(store.id)"
        >
          View Store
        </button>
      </div>
    </div>
  </div>
</template>
