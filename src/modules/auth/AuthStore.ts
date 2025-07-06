import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('authToken'));
  const isLoggedIn = ref<boolean>(!!token.value);

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('authToken', newToken);
    isLoggedIn.value = true;
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('authToken');
    isLoggedIn.value = false;
  }

  return {
    token,
    isLoggedIn,
    setToken,
    logout
  };
});
