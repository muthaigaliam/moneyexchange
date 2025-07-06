// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import ExchangeRates from '@/views/ExchangeRates.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ExchangeRates,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
