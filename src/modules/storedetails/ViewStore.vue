<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '../navbar/Navbar.vue';
import ProductCard from '../products/ProductCard.vue';
import useProductService from '../products/productsService';
import type { Product } from '../products/productsTypes';
import { useWishlistStore } from '../wishlist/WishlistStore';

const router = useRouter();
const route = useRoute();
const activeCategory = ref<string>('');
const showInStockOnly = ref(false);
const priceRange = ref<[number, number]>([0, 2000]);

const { fetchProductforSpecificStore } = useProductService();
const {
  data: storeData,
  isSuccess: storeDataIsSuccess,
  isPending: storeDataIsPending,
  mutate: fetchProductMutate
} = fetchProductforSpecificStore();

const storeId = computed(() => {
  const id = parseInt(route.params.id as string, 10);
  return isNaN(id) ? null : id;
});

const categories = computed(() => {
  if (!storeData.value || !Array.isArray(storeData.value)) return [];
  const uniqueCategories = new Set<string>();
  storeData.value.forEach((product) => {
    if (product.product_categories?.name) {
      uniqueCategories.add(product.product_categories.name);
    }
  });
  return Array.from(uniqueCategories);
});

const storeList = ref<Product[]>([]);

const fetchProducts = () => {
  if (storeId.value !== null) {
    fetchProductMutate(storeId.value, {
      onSuccess: (data) => {
        storeList.value = data || [];
        if (categories.value.length > 0 && activeCategory.value === '') {
          activeCategory.value = categories.value[0];
        }
      },
      onError: (error) => {
        console.error('Error fetching stores:', error);
      }
    });
  }
};

onMounted(fetchProducts);
watch(storeId, (newId) => {
  if (newId !== null) fetchProducts();
});

const filteredStores = computed(() => {
  return storeList.value.filter(product => {
    const categoryMatch = !activeCategory.value || product.product_categories?.name === activeCategory.value;
    const stockMatch = !showInStockOnly.value || product.quantity > 0;
    const priceMatch = product.net_price >= priceRange.value[0] && product.net_price <= priceRange.value[1];
    return categoryMatch && stockMatch && priceMatch;
  });
});

function viewProduct(product: Product) {
  router.push({ path: `/product/${product.id}` });
}

const goBack = () => {
  router.back();
};

const wishlistStore = useWishlistStore();  // Use Pinia store
const addToWishlist = (product: any) => {
  console.log('Adding to wishlist:', product);
  wishlistStore.addToWishlist(product);  // Add to wishlist in store
};

const handleRemoveWishlist = (id: number) => {
  console.log('Removing from wishlist, ID:', id);
  wishlistStore.removeFromWishlist(id);  // Remove from wishlist in store
};

// Log changes in the wishlist store
watch(
  () => wishlistStore.wishlist, 
  (newWishlist) => {
    console.log('Wishlist updated:', newWishlist);
  },
  { deep: true }
);
</script>


<template>
  <Navbar   />
  <div class="p-6">
    <div class="flex items-center mb-6 py-6">
      <button @click="goBack" class="text-orange-500 text-md hover:text-orange-600 flex items-center mr-4">
        ← Back
      </button>
      <h1 class="text-xl font-bold text-center flex-1">List of Products</h1>
    </div>

    <div class="flex gap-6">
      <!-- Filters -->
      <aside class="w-72 bg-white shadow-lg rounded-xl p-6 text-sm space-y-8">
        <div>
          <h2 class="text-md font-semibold mb-2 text-orange-500">Availability</h2>
          <label class="flex items-center justify-between bg-gray-100 p-2 rounded hover:bg-gray-200">
            <span>In Stock</span>
            <input
              type="checkbox"
              v-model="showInStockOnly"
              class="form-checkbox text-orange-500 w-5 h-5 rounded focus:ring-orange-400"
            />
          </label>
        </div>

        <div>
          <h2 class="text-md font-semibold mb-2 text-orange-500">Price</h2>
          <div class="space-y-4">
            <input type="range" min="0" max="2000" step="10" v-model="priceRange[0]" class="w-full" />
            <input type="range" min="0" max="2000" step="10" v-model="priceRange[1]" class="w-full" />
            <div class="flex justify-between text-sm text-gray-700 font-medium">
              <span>${{ priceRange[0] }}</span>
              <span>${{ priceRange[1] }}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-md font-semibold mb-2 text-orange-500">Categories</h2>
          <div class="space-y-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeCategory = category"
              :class="[
                'block w-full text-left px-3 py-1 rounded hover:bg-orange-100',
                activeCategory === category ? 'text-orange-600 font-semibold' : 'text-gray-700'
              ]"
            >
              {{ category }}
            </button>
            <button
              @click="activeCategory = ''"
              :class="[
                'block w-full text-left px-3 py-1 rounded hover:bg-orange-100',
                activeCategory === '' ? 'text-orange-600 font-semibold' : 'text-gray-700'
              ]"
            >
              All
            </button>
          </div>
        </div>
      </aside>

      <!-- Products -->
      <div class="flex-1">
        <div v-if="storeDataIsPending" class="text-center py-6">Loading products...</div>
        <div v-else-if="!storeDataIsSuccess" class="text-center py-6 text-red-500">Failed to load products</div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in filteredStores"
            :key="product.id"
            class="p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
          >
            <ProductCard
              :image="product.images?.[0]?.url ? 'https://chapchap.marshsoft.org' + product.images[0].url : 'https://via.placeholder.com/151'"
              :title="product.name"
              :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
              buttonText="View Product"
              @view="viewProduct(product)"
              @wishlist="addToWishlist(product)"
            />
          </div>
          <div v-if="filteredStores.length === 0 && storeDataIsSuccess" class="text-center py-6 col-span-full text-gray-500">
            No products found in the selected category.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #f3f4f6;
  border-radius: 9999px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #f97316;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #f97316;
}
</style>
