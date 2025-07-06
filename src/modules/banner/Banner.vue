<template>
  <div class="relative w-full h-48 overflow-hidden rounded-lg shadow-lg bg-orange-100">
    <!-- Slides Container -->
    <div 
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 relative">
        <img 
          :src="slide.image" 
          :alt="`Slide ${index + 1}`" 
          class="w-full h-48 object-cover"
          @error="handleImageError(index)"
        />
        <div 
          v-if="slide.error" 
          class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 text-white text-2xl font-bold"
        >
          Black Friday - Up to 30% Off
        </div>
      </div>
    </div>

    <!-- Dots Indicator -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
      <span 
        v-for="(slide, index) in slides" 
        :key="index" 
        @click="currentIndex = index"
        class="w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
        :class="currentIndex === index ? 'bg-orange-500 scale-110' : 'bg-white opacity-50 hover:opacity-100'"
      ></span>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 rounded-full p-2 shadow-md"
    >
      ‹
    </button>
    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 rounded-full p-2 shadow-md"
    >
      ›
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import image from '../../assets/sales.jpg';

interface Slide {
  image: string;
  error?: boolean;
}

const slides = ref<Slide[]>([
  { image },
  { image },
  { image }
]);

const currentIndex = ref<number>(0);

// Auto slide every 5 seconds
let interval: number;

onMounted(() => {
  interval = window.setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
};

const handleImageError = (index: number) => {
  slides.value[index].error = true;
};
</script>
