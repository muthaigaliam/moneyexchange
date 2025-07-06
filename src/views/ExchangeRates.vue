<template>
  <div
    :class="[
      'min-h-screen font-sans transition-colors duration-300',
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-white to-blue-50 text-gray-800'
    ]"
    style="background-image: url('https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=1350&q=80'); background-size: cover; background-attachment: fixed;"
  >
    <!-- Dark Mode Toggle -->
    <button
      @click="toggleDarkMode"
      class="fixed top-4 right-4 z-50 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-full shadow p-2 hover:scale-105 transition"
      title="Toggle Dark Mode"
    >
      <span v-if="!isDark">🌙</span>
      <span v-else>☀️</span>
    </button>

    <!-- Mobile Drawer Toggle -->
    <button
      class="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition md:hidden"
      @click="drawerOpen = !drawerOpen"
    >
      ☰
    </button>

    <!-- Mobile Drawer Menu -->
    <transition name="slide">
      <div v-if="drawerOpen" class="fixed inset-0 bg-black/50 z-40" @click="drawerOpen = false">
        <div class="w-64 bg-white dark:bg-gray-900 h-full shadow-lg p-6" @click.stop>
          <h3 class="text-xl font-bold mb-4 text-blue-700 dark:text-white">Menu</h3>
          <ul class="space-y-4">
            <li><a href="#" class="hover:text-blue-500">Home</a></li>
            <li><a href="#" class="hover:text-blue-500">Exchange Rates</a></li>
            <li><a href="#" class="hover:text-blue-500">Why Us</a></li>
            <li><a href="#" class="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- Header -->
    <header class="text-center py-16 bg-white/70 dark:bg-gray-800/70 rounded-b-xl shadow-md">
      <h1 class="text-4xl md:text-6xl font-extrabold text-blue-800 dark:text-white animate-typewriter overflow-hidden border-r-4 border-blue-800 dark:border-white whitespace-nowrap mx-auto w-fit">
        {{ typedTitle }}
      </h1>
      <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-fadeInUp px-4">
        At Bright Trading Ltd, we specialize in fast and secure currency exchange services across Africa and internationally.
        Whether you're converting USD to KES or trading USDT, we guarantee the best rates and professional support.
      </p>
    </header>

    <!-- Exchange Rates -->
    <section class="max-w-5xl mx-auto p-6 mt-6 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md">
      <h2 class="text-2xl md:text-3xl font-semibold mb-6 text-center">Today's Exchange Rates</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="rate in exchangeRates"
          :key="rate.code"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-2xl transform transition duration-300 hover:scale-105"
        >
          <div class="flex items-center space-x-2 mb-2">
            <template v-if="rate.flag === 'crypto'">
              <img :src="cryptoIcons[rate.code]" alt="crypto logo" class="w-6 h-6 rounded-full object-cover shadow" />
            </template>
            <template v-else>
              <img :src="`https://flagcdn.com/w40/${rate.flag}.png`" alt="flag" class="w-6 h-4 rounded-sm object-cover shadow" />
            </template>
            <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ rate.currency }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-300">({{ rate.code }})</span>
          </div>
          <p>Buy: <span class="font-semibold">{{ rate.buy }}</span></p>
          <p>Sell: <span class="font-semibold">{{ rate.sell }}</span></p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="max-w-4xl mx-auto mt-12 px-6 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md py-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Why Choose Us?</h2>
      <ul class="space-y-4 text-base md:text-lg">
        <li v-for="(item, i) in services" :key="i" class="flex items-center space-x-3 animate-pulse-once">
          <span class="text-green-500 text-xl">✔️</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <!-- Testimonials -->
    <section class="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6">What Our Clients Say</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(testi, i) in testimonials" :key="i" class="bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:scale-105 transition">
          <p class="text-sm italic text-gray-600 dark:text-gray-300">"{{ testi.feedback }}"</p>
          <div class="mt-3 font-semibold text-blue-700 dark:text-blue-400">- {{ testi.name }}</div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="max-w-4xl mx-auto mt-12 px-6 py-10 text-center bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Trusted By</h2>
      <div class="flex justify-center gap-8 flex-wrap items-center">
        <img v-for="(logo, i) in partnerLogos" :key="i" :src="logo" alt="partner" class="w-24 h-auto grayscale hover:grayscale-0 transition" />
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-white py-6 mt-12">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
        <div>© 2025 BRIGHT TRADING LTD</div>
        <div class="flex space-x-4">
          <a href="#" title="Facebook" class="hover:text-blue-400">Facebook</a>
          <a href="#" title="Twitter" class="hover:text-blue-400">Twitter</a>
          <a href="#" title="Instagram" class="hover:text-blue-400">Instagram</a>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Floating Button -->
    <div class="fixed bottom-5 right-5 z-50 animate-bounce-in">
      <a
        :href="whatsappLink"
        target="_blank"
        class="bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 10c0-3.866 3.582-7 8-7s8 3.134 8 7c0 1.848-.765 3.513-2.023 4.748L21 21l-5.249-2.017C14.513 18.235 12.848 19 11 19c-4.418 0-8-3.134-8-7z" />
        </svg>
        <span>Chat on WhatsApp</span>
      </a>
    </div>

    <!-- Background Music Player -->
    <audio ref="bgMusic" loop autoplay hidden :src="musicUrl"></audio>
    <button
      @click="toggleMusic"
      class="fixed bottom-24 right-5 z-50 bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      title="Toggle Music"
    >
      {{ isMusicPlaying ? '🔊' : '🔇' }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ExchangeRates",
  data() {
    return {
      isDark: false,
      drawerOpen: false,
      fullTitle: "BRIGHT TRADING LTD",
      typedTitle: "",
      typingIndex: 0,
      isMusicPlaying: true,
      musicUrl: "https://cdn.pixabay.com/download/audio/2023/05/06/audio_5d8036e4f7.mp3?filename=smooth-background-ambient-142651.mp3", // Free background music
      exchangeRates: [
        { code: "USD", currency: "US Dollar", buy: "160", sell: "162", flag: "us" },
        { code: "TZS", currency: "Tanzanian Shilling", buy: "18", sell: "20", flag: "tz" },
        { code: "UGX", currency: "Ugandan Shilling", buy: "30", sell: "33", flag: "ug" },
        { code: "GHS", currency: "Ghanaian Cedi", buy: "13", sell: "14.2", flag: "gh" },
        { code: "NGN", currency: "Nigerian Naira", buy: "1.5", sell: "2", flag: "ng" },
        { code: "KES", currency: "Kenyan Shilling", buy: "1", sell: "1.2", flag: "ke" },
        { code: "EUR", currency: "Euro", buy: "170", sell: "173", flag: "eu" },
        { code: "XOF", currency: "West African CFA Franc", buy: "0.30", sell: "0.32", flag: "sn" },
        { code: "GBP", currency: "British Pound", buy: "190", sell: "195", flag: "gb" },
        { code: "RMB", currency: "Chinese Yuan", buy: "20", sell: "22", flag: "cn" },
        { code: "USDT", currency: "Tether (Crypto)", buy: "155", sell: "160", flag: "crypto" },
        { code: "USDC", currency: "USD Coin (Crypto)", buy: "154", sell: "159", flag: "crypto" },
      ],
      services: [
        "Trusted & Licensed Money Exchanger",
        "Competitive exchange rates",
        "Fast processing & instant settlement",
        "Serves local and international clients",
        "Direct WhatsApp support",
        "Transparent pricing — no hidden charges",
      ],
      testimonials: [
        { name: "Mary K.", feedback: "Super fast exchange and the best rate I’ve seen in Nairobi!" },
        { name: "John O.", feedback: "Excellent customer service and very trustworthy team." },
      ],
      partnerLogos: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png?v=026",
      ],
      whatsappNumber: "254752341183",
      defaultMessage: "Hello BRIGHT TRADING LTD, I'm interested in your money exchange services.",
      cryptoIcons: {
        USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=026",
        USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026",
      },
    };
  },
  computed: {
    whatsappLink() {
      return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
    },
    toggleMusic() {
      const player = this.$refs.bgMusic;
      if (this.isMusicPlaying) {
        player.pause();
      } else {
        player.play();
      }
      this.isMusicPlaying = !this.isMusicPlaying;
    },
    typeWriter() {
      if (this.typingIndex < this.fullTitle.length) {
        this.typedTitle += this.fullTitle[this.typingIndex];
        this.typingIndex++;
        setTimeout(this.typeWriter, 100);
      }
    },
  },
  mounted() {
    this.typeWriter();
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}
.animate-bounce-in {
  animation: bounceIn 1.2s ease-out;
}
.animate-typewriter {
  animation: typewriter 2.5s steps(30) 1 normal both;
}
.animate-pulse-once {
  animation: pulse 1.5s ease-out 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
