<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../navbar/Navbar.vue';
import useProductService from '../products/productsService';
import { useAuthStore } from '../auth/AuthStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Form and login data
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'card'
});
const loginForm = ref({
  email: '',
  password: ''
});

// Product data
const product = ref<Product[]>([]); // Declare the array for multiple products
const { fetchProductforSpecificStore } = useProductService();
const { mutate: fetchProductMutate } = fetchProductforSpecificStore();

// Fetch products on component mount
onMounted(() => {
  const productIds = route.query.productIds ? (route.query.productIds as string).split(',') : [];
  productIds.forEach(productId => {
    fetchProductMutate(productId, {
      onSuccess: (data: Product[]) => {
        if (data) {
          product.value = data.map(p => ({
            ...p,
            quantity: 1 // Set default quantity to 1
          }));
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
});

// Helper function to get image URL
function getProductImageUrl(product: Product): string {
  return product.images && Array.isArray(product.images) && product.images.length > 0
    ? 'https://chapchap.marshsoft.org' + product.images[0].url
    : 'https://chapchap.marshsoft.org/uploads/default-product.jpeg'; // Default image
}

// Login method
function login() {
  console.log('Logging in:', loginForm.value);
  authStore.login(loginForm.value.email, loginForm.value.password); // Assuming your auth store handles login logic
}

// Submit order
function submitOrder() {
  console.log('Order submitted:', {
    products: product.value,
    ...form.value
  });
  alert('Your order has been submitted!');
  router.push({ name: 'home' }); // Redirect to homepage or order summary
}

// Calculate the total price for a product
function getTotalForProduct(product: Product) {
  return product.net_price * product.quantity;
}

// Trigger recalculation of total when quantity is changed
function calculateTotal() {
  // Update total price whenever the quantity is modified
  product.value.forEach(p => {
    p.total = getTotalForProduct(p);
  });
}
</script>
<template>
  <div class="py-10 bg-gray-50 min-h-screen">
    <Navbar :wishlist="wishlist" />
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Section: Login / Delivery & Payment -->
        <div class="space-y-8">
          <!-- Login Section -->
          <div v-if="!authStore.isLoggedIn">
            <h2 class="text-xl font-semibold text-gray-800">Login</h2>
            <form @submit.prevent="login" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="loginForm.email" type="email" required class="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input v-model="loginForm.password" type="password" required class="w-full mt-1 p-2 border rounded" />
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>

          <!-- Delivery & Payment Section (Visible if logged in) -->
          <div v-else>
            <h2 class="text-xl font-semibold text-gray-800">Delivery Details</h2>
            <form @submit.prevent="submitOrder" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input v-model="form.name" type="text" required class="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="form.email" type="email" required class="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input v-model="form.phone" type="tel" required class="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea v-model="form.address" required class="w-full mt-1 p-2 border rounded"></textarea>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700">Payment Method</label>
                <select v-model="form.paymentMethod" class="w-full mt-1 p-2 border rounded">
                  <option value="card">Credit/Debit Card</option>
                  <option value="mpesa">MPesa</option>
                </select>
              </div>

              <button
                type="submit"
                class="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded hover:bg-orange-700 transition"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>

        <!-- Right Section: Product Summary and Quantity -->
        <div class="overflow-y-auto h-80 space-y-4 pr-4 max-w-sm">
          <div v-for="(product, index) in product" :key="product.id" class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                :src="getProductImageUrl(product)"
                alt="Product Image"
                class="w-24 h-24 object-contain rounded-lg border"
              />
            </div>
            <div class="flex-1">
              <h2 class="text-sm font-semibold text-gray-800">{{ product.name }}</h2>
              <p class="text-xs text-gray-600">{{ product.description }}</p>
              <div class="mt-2">
                <p class="text-gray-500 line-through text-xs">
                  Ksh {{ product.gross_price.toFixed(2) }}
                </p>
                <p class="text-orange-600 font-bold text-sm">
                  Ksh {{ product.net_price.toFixed(2) }}
                </p>
                <p class="text-green-600 text-xs">You save {{ product.discount }}%</p>
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">Quantity</label>
              <input
                v-model.number="product.quantity"
                type="number"
                min="1"
                class="w-16 p-2 border rounded text-center text-sm"
                @input="calculateTotal"
              />
            </div>
            <div class="ml-2">
              <p class="text-xs font-semibold">Total: Ksh {{ getTotalForProduct(product).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
