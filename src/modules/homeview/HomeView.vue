<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <aside class="w-52 bg-gray-800 text-white flex flex-col p-8">
      <div class="text-xl font-bold mb-8">🏋️ ACTIVATE</div>
      <nav class="space-y-4">
        <a href="#" class="text-red-500 font-bold block">Dashboard</a>
        <a href="#" class="text-gray-400 block">Workouts</a>
        <a href="#" class="text-gray-400 block">Analytics</a>
        <a href="#" class="text-gray-400 block">Settings</a>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <section class="mb-6">
        <h1 class="text-2xl font-semibold">Hello Moha</h1>
      </section>

      <section class="flex flex-wrap gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4 flex-1 min-w-[200px]">
          Total workouts <strong class="block text-xl">12</strong><span class="text-sm text-gray-500">workouts</span>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex-1 min-w-[200px]">
          Calories burned <strong class="block text-xl">859</strong><span class="text-sm text-gray-500">kcal</span>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex-1 min-w-[200px]">
          Total Hours <strong class="block text-xl">320</strong><span class="text-sm text-gray-500">hours</span>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex-1 min-w-[200px]">
          Current Streak <strong class="block text-xl">14</strong><span class="text-sm text-gray-500">days</span>
        </div>
        <div class="bg-white rounded-lg shadow p-4 w-full">
          <p class="mb-2">Days Active</p>
          <div class="grid grid-cols-[repeat(30,10px)] gap-[2px] mt-2">
            <div
              v-for="day in 100"
              :key="day"
              :class="['w-[10px] h-[10px] rounded-sm', day <= 30 ? 'bg-red-500' : 'bg-gray-300']"
            ></div>
          </div>
        </div>
      </section>

      <section class="flex gap-8">
        <div class="bg-white rounded-lg shadow p-4 flex-1">
          <h2 class="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul class="space-y-4">
            <li
              v-for="day in recentDays"
              :key="day.id"
              class="flex justify-between border-b pb-2 border-gray-200"
            >
              <div>
                <strong>Day {{ day.day }}</strong>
                <span class="block text-sm text-red-500">{{ day.calories }}kcal</span>
              </div>
              <div class="text-right">
                <small class="block text-gray-500">{{ day.workout }}</small>
                <span class="block text-sm">{{ day.duration }} minutes</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex-1 space-y-8">
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-4">Personal Growth</h3>
            <div class="space-y-2">
              <div class="h-[200px] bg-red-500"></div>
              <div class="h-[100px] bg-gray-300"></div>
              <div class="h-[100px] bg-gray-300"></div>
              <div class="h-[100px] bg-gray-300"></div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-4">Workout Ratio</h3>
            <div class="flex justify-around mb-4">
              <div class="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-center text-xs">
                Cardio<br />12%
              </div>
              <div class="w-20 h-20 rounded-full bg-gray-700 text-white flex items-center justify-center text-center text-xs">
                Strength<br />88%
              </div>
            </div>
            <div>
              <h3 class="font-medium">Completion By Workout</h3>
              <p>Strength 88%</p>
              <div class="h-2 bg-red-500 mb-2 w-[88%]"></div>
              <p>Cardio 12%</p>
              <div class="h-2 bg-gray-400 w-[12%]"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

type RecentDay = {
  id: number
  day: number
  calories: number
  workout: string
  duration: number
}

const recentDays = ref<RecentDay[]>([
  { id: 1, day: 19, calories: 95, workout: 'Full Body Workout', duration: 15 },
  { id: 2, day: 18, calories: 80, workout: 'Arms Workout', duration: 12 },
  { id: 3, day: 17, calories: 105, workout: 'Legs Workout', duration: 25 },
  { id: 4, day: 16, calories: 105, workout: 'Legs Workout', duration: 25 },
])
</script>

