<template>
  <div class="py-8 min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-8">
      <div class="flex flex-col md:flex-row gap-12">
        <!-- Product Image -->
        <div class="w-full md:w-1/2 space-y-6">
          <div class="relative overflow-hidden rounded-lg border shadow-md">
            <img
              :src="imageUrl"
              alt="Product Image"
              class="w-full h-80 object-contain hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
          <!-- Product Thumbnails -->
          <div class="flex gap-4 justify-center">
            <img
              v-for="(img, index) in ProductDetails[0]?.images || []"
              :key="index"
              :src="'https://chapchap.marshsoft.org' + img.url"
              class="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:ring-4 ring-orange-500 transition-transform"
              @click="selectImage(index)"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 space-y-6">
          <h1 class="text-4xl font-extrabold text-gray-900">{{ ProductDetails[0]?.name }}</h1>

          <!-- Rating + Wishlist -->
          <div class="flex items-center justify-between">
            <div class="flex items-center text-yellow-400 gap-1">
              <span v-for="i in 4" :key="i">★</span><span class="text-gray-400">★</span>
              <span class="text-sm text-gray-500 ml-2">(123 reviews)</span>
            </div>
            <button
              @click.stop="toggleWishlist"
              :class="{
                'text-red-500': isInWishlist,
                'text-gray-400': !isInWishlist
              }"
              class="transition-colors text-3xl"
              title="Add to Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3.172 5.172a4.004 4.004 0 015.656 0L10 6.343l1.172-1.171a4.004 4.004 0 115.656 5.656L10 17.657l-6.828-6.829a4.004 4.004 0 010-5.656z" />
              </svg>
            </button>
          </div>

          <p class="text-lg text-gray-700 leading-relaxed mt-2">
            {{ ProductDetails[0]?.description || 'No description provided.' }}
          </p>

          <!-- Price Info -->
          <div class="text-xl space-y-1 mt-6">
            <p class="text-gray-500 line-through">Ksh {{ ProductDetails[0]?.gross_price?.toFixed(2) }}</p>
            <p class="text-orange-600 font-semibold">Net Price: Ksh {{ ProductDetails[0]?.net_price?.toFixed(2) }}</p>
            <p class="text-green-600 text-sm">You save {{ ProductDetails[0]?.discount }}%</p>
          </div>

          <!-- Attributes -->
          <div v-if="ProductDetails[0]?.attributes" class="text-sm mt-4">
            <h3 class="font-semibold text-gray-700 mb-2">Attributes</h3>
            <ul class="flex gap-4">
              <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700">Size: {{ ProductDetails[0]?.attributes?.size }}</li>
              <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700">Color: {{ ProductDetails[0]?.attributes?.color }}</li>
            </ul>
          </div>

          <!-- Availability -->
          <p class="text-sm text-gray-700 mt-4">
            <span class="font-medium">In stock:</span> {{ ProductDetails[0]?.quantity }} items
          </p>

          <!-- Category Info -->
          <div class="text-sm text-gray-500 mt-2">
            <p>Category: {{ ProductDetails[0]?.product_categories?.name }}</p>
            <p>Sub-category: {{ ProductDetails[0]?.product_sub_categories?.name }}</p>
          </div>

          <!-- Delivery Info -->
          <div class="bg-gray-50 border text-sm rounded-lg p-4 mt-6">
            🚚 <strong>Free delivery</strong> within 3-5 business days. <br />
            🔄 Easy returns within 7 days.
          </div>

          <!-- Store Info -->
          <div class="border-t pt-6 mt-6 flex gap-6 items-center">
            <img
              :src="'https://chapchap.marshsoft.org' + ProductDetails[0]?.stores?.logoUrl"
              alt="Store Logo"
              class="w-16 h-16 object-cover rounded-full border"
            />
            <div class="text-sm text-gray-700">
              <p class="font-semibold">{{ ProductDetails[0]?.stores?.name }}</p>
              <p>📞 {{ ProductDetails[0]?.stores?.telephone }}</p>
              <p>📧 {{ ProductDetails[0]?.stores?.email }}</p>
              <p>📍 {{ ProductDetails[0]?.stores?.address }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-6 pt-8">
            <button
              class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-transform transform hover:scale-105"
              @click="checkout"
            >
              🛒 Proceed to Checkout
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-xl transition-transform transform hover:scale-105"
              @click="goBack"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProductService from './productsService';
import Navbar from '../navbar/Navbar.vue';
import { useWishlistStore } from '../wishlist/WishlistStore'; // Import the store
import type { Product } from '../homeview/HomeViewTypes';

// State
const product = ref<Product[]>([]);
const selectedImageIndex = ref(0);

const route = useRoute();
const router = useRouter();

// Access the wishlist store
const wishlistStore = useWishlistStore();

// Fetch product details
onMounted(() => {
  const productId = route.params.id as string;

  const { mutate: fetchProductMutate } = useProductService().fetchProductforSpecificStore();

  fetchProductMutate(productId, {
    onSuccess: (data: Product[]) => {
      if (data) {
        product.value = data;
      } else {
        console.warn('No product data returned');
        product.value = [];
      }
    },
    onError: (error: any) => {
      console.error('Failed to fetch product:', error);
      product.value = [];
    }
  });
});

// Computed
const ProductDetails = computed(() => product.value.filter(p => p.id !== null));

const imageUrl = computed(() => {
  const base = 'https://chapchap.marshsoft.org';
  const img = ProductDetails.value[0]?.images?.[selectedImageIndex.value]?.url;
  return img ? base + img : base + '/uploads/shirt.jpeg';
});

const isInWishlist = computed(() => {
  return wishlistStore.wishlist.some(item => item.id === ProductDetails.value[0]?.id);
});

// Methods
function selectImage(index: number) {
  selectedImageIndex.value = index;
}


function checkout() {
  if (ProductDetails.value.length > 0) {
    router.push({ name: 'checkout',query: { productIds: ProductDetails.value[0].id }  });

  } 
}

function goBack() {
  router.back();
}

function toggleWishlist() {
  const productToAdd = ProductDetails.value[0];
  if (!productToAdd) return;

  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(productToAdd.id);
  } else {
    wishlistStore.addToWishlist(productToAdd);
  }
}

function handleRemoveWishlist(id: number) {
  wishlistStore.removeFromWishlist(id);
}
</script>