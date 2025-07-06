<!-- src/layouts/DashboardLayout.vue -->
<template>
    <div class="flex min-h-screen font-sans bg-gray-100">
      <aside class="bg-gray-800 text-white p-8 w-52 flex flex-col">
        <div class="text-xl font-bold mb-8">🏋️ ACTIVATE</div>
        <nav class="space-y-4">
          <a href="#" class="text-gray-400 hover:text-white font-medium" :class="{ 'text-red-500 font-bold': active === 'dashboard' }">Dashboard</a>
          <a href="#" class="text-gray-400 hover:text-white font-medium" :class="{ 'text-red-500 font-bold': active === 'workouts' }">Workouts</a>
          <a href="#" class="text-gray-400 hover:text-white font-medium" :class="{ 'text-red-500 font-bold': active === 'analytics' }">Analytics</a>
          <a href="#" class="text-gray-400 hover:text-white font-medium" :class="{ 'text-red-500 font-bold': active === 'settings' }">Settings</a>
        </nav>
      </aside>
  
      <main class="flex-1 p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    active: string;
  }>();
  </script>
  