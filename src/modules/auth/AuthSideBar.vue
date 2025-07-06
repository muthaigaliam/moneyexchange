<template>
  <div>
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">
        {{ isLogin ? "Login to Shop" : "Create an Account" }}
      </h2>

      <!-- Sign Up only fields -->
      <div v-if="!isLogin && !signUpSuccess">
        <input
          type="text"
          v-model="name"
          placeholder="Full Name"
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          v-model="telephone"
          placeholder="Phone Number"
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          v-model="roleId"
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        >
          <option disabled value="">Select Role</option>
          <option :value="1">Admin</option>
          <option :value="2">Vendor</option>
          <option :value="3">Customer</option>
        </select>
      </div>

      <!-- Common fields -->
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        :disabled="isLoggedIn"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        :disabled="isLoggedIn"
      />

      <button
        class="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
        @click="handleAuthAction"
        :disabled="isRegistering || isLoggingIn || isLoggedIn"
      >
        {{ isLogin ? (isLoggingIn ? "Logging..." : "Login Now") : isRegistering ? "Signing Up..." : "Sign Up Now" }}
      </button>

      <p class="mt-6 text-sm text-center text-gray-600">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <span
          class="text-orange-500 cursor-pointer font-semibold hover:underline"
          @click="toggleLoginState"
        >
          {{ isLogin ? "Sign Up" : "Login" }}
        </span>
      </p>

      <!-- Sign-up success message -->
      <div v-if="signUpSuccess" class="mt-6 text-center">
        <p class="text-green-500 font-semibold">Registration successful! Please log in.</p>
        <button
          @click="toggleLoginState"
          class="mt-4 w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Go to Login
        </button>
      </div>

      <!-- Display user information if logged in -->
      <div v-if="isLoggedIn" class="mt-6 text-center">
        <p class="text-gray-800 font-semibold">You are logged in as {{ userInfo?.user?.name }}!</p>
        <button
          @click="logout"
          class="mt-4 w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import useAuthService from './AuthService';
import { useNotification } from '@/composables'; // Assuming you have this composable for notifications
import type { AuthPayload, AuthResponse, LoginPayload } from './AuthTypes';

import { useAuthStore } from './AuthStore';

const authStore = useAuthStore();



// Define props using `defineProps`
const props = defineProps<{
  isSidebarOpen: boolean;
  activeSidebar: 'auth' | 'wishlist' | 'cart' | null;
  closeSidebar: () => void;
}>();

const isLogin = ref(true);
const isLoggedIn = ref(false); // State to track if the user is logged in
const signUpSuccess = ref(false); // State to track if sign-up is successful

// Common fields
const email = ref('');
const password = ref('');

// Sign-up only fields
const name = ref('');
const telephone = ref('');
const roleId = ref<number | ''>('');

const { success, error } = useNotification();

// Auth API hook
const { useRegisterUser, useLoginUser } = useAuthService();


// Form submission logic
const {
  mutate: registerUserMutate,
  isPending: isRegistering,
  isSuccess: registerSuccess,
  data: registeredUser
} = useRegisterUser();

const {
  mutate: loginUserMutate,
  isPending: isLoggingIn
} = useLoginUser();

const userInfo = ref<AuthResponse | null>(null);

// Form submission logic
function submitForm() {
  if (isLogin.value) {
    const loginPayload: LoginPayload = {
      email: email.value,
      password: password.value,
    };

    loginUserMutate(loginPayload, {
      onSuccess: (data: AuthResponse) => {
        userInfo.value = data;
        // On successful login
        authStore.setToken(data.token);
        const token = data.token; // Assuming the token is in data.token

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Set logged-in state to true
        isLoggedIn.value = true;


        // Clear inputs after successful login
        clearForm();

        // Close modal if applicable
        closeModal();
      },
      onError: (err) => {
        error('Login failed. Please check your credentials.');
      }
    });
  } else {
    const signupPayload: AuthPayload = {
      name: name.value,
      email: email.value,
      password: password.value,
      telephone: telephone.value,
      role_id: roleId.value as number,
    };

    registerUserMutate(signupPayload, {
      onSuccess: (data: AuthResponse) => {
        userInfo.value = data;
        success('Registered successfully');
        console.log('Registered successfully:', data);

        // Set signUpSuccess to true to show the "Please log in" message
        signUpSuccess.value = true;
        
        // Switch to login after successful sign up
        isLogin.value = true;  // Automatically toggle to login form

        // Clear inputs after successful registration
        clearForm();
        // Close modal if applicable
        // closeModal();
      },
      onError: (err) => {
        error('Registration failed. Please try again.');
      }
    });
  }
}

// Function to clear form inputs
function clearForm() {
  email.value = '';
  password.value = '';
  name.value = '';
  telephone.value = '';
  roleId.value = '';
}

// Function to close the modal
function closeModal() {
  // Close the modal by calling the passed-in closeSidebar prop
  props.closeSidebar();
}

// Toggle between login and sign-up states
function toggleLoginState() {
  isLogin.value = !isLogin.value;
  signUpSuccess.value = false; // Reset sign-up success message when switching to login
}

function logout() {
  isLoggedIn.value = false;
  userInfo.value = null;
  email.value = '';
  password.value = '';
  name.value = '';
  telephone.value = '';
  roleId.value = '';
  props.closeSidebar();
  // Remove token from localStorage
  localStorage.removeItem('authToken');

  // Update the state
  isLoggedIn.value = false;
  userInfo.value = null;

  // Optionally clear the form fields or other states
  clearForm();

  // Close modal if applicable
  closeModal();
}
function handleAuthAction() {
  if (isLoggedIn.value) {
    logout(); // Log out if the user is logged in
  } else {
    submitForm(); // Proceed with login or sign up
  }
}

</script>
