<template>
  <div
    :class="[
      'min-h-screen font-sans transition-colors duration-300',
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-white to-blue-50 text-gray-800'
    ]"
    style="background-image: url('https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=1350&q=80'); background-size: cover; background-attachment: fixed;"
  >
    <!-- Dark Mode Toggle -->
    <button @click="toggleDarkMode"
      class="fixed top-4 right-4 z-50 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-full p-2 shadow hover:scale-105 transition"
      title="Toggle Dark Mode">
      <span v-if="!isDark">🌙</span><span v-else>☀️</span>
    </button>

    <!-- Mobile Menu -->
    <button class="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow md:hidden"
      @click="drawerOpen = !drawerOpen">☰</button>
    <transition name="slide">
      <div v-if="drawerOpen" class="fixed inset-0 bg-black/50 z-40" @click="drawerOpen = false">
        <div class="w-64 bg-white dark:bg-gray-900 h-full p-6 shadow-lg" @click.stop>
          <h3 class="text-xl mb-4 dark:text-white">Menu</h3>
          <ul class="space-y-4">
            <li><a href="#rates" class="hover:text-blue-500">Exchange Rates</a></li>
            <li><a href="#about" class="hover:text-blue-500">About Us</a></li>
            <li><a href="#why" class="hover:text-blue-500">Why Us</a></li>
            <li><a href="#contact" class="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- Hero Section -->
    <header class="text-center py-16 bg-white/60 dark:bg-gray-800/70 backdrop-blur-sm rounded-b-xl shadow-md">
      <h1
        class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 overflow-hidden">
        {{ typedTitle }}
      </h1>
      <p class="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-fadeInUp px-4">
        At Bright Trading Ltd, we specialize in fast and secure currency exchange services across Africa,United States,China and Russia.
      </p>
    </header>

    <!-- Exchange Rates -->
    <section id="rates" class="max-w-5xl mx-auto p-6 mt-6 bg-white/60 dark:bg-gray-800/70 backdrop-blur rounded-xl shadow-md">
      <h2 class="text-3xl font-semibold text-center mb-6">Today's Live Exchange Rates</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="rate in exchangeRates" :key="rate.code"
          class="p-5 bg-white/80 dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition backdrop-blur">
          <div class="flex items-center space-x-3 mb-3">
            <img :src="getFlagIcon(rate)" class="w-6 h-6 rounded shadow-sm" />
            <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ rate.currency }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-300">({{ rate.code }})</span>
          </div>
          <p>Buy: <span class="font-semibold">KES {{ rate.buy }}</span></p>
          <p>Sell: <span class="font-semibold">KES {{ rate.sell }}</span></p>
        </div>
      </div>
    </section>

    <!-- About Us -->
    <section id="about"
      class="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md backdrop-blur-sm">
      <h2 class="text-3xl font-semibold text-center mb-6">About Us</h2>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Bright Trading Ltd has served individuals and businesses across Africa since 2010. We offer reliable,
        transparent, and fast currency exchange — both fiat and crypto (USD, KES, USDT…). Licensed, compliant,
        and focused on exceptional client service through both digital and in‑person support.
      </p>
    </section>

    <!-- Why Choose Us -->
    <section id="why"
      class="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white/60 dark:bg-gray-800/70 rounded-xl shadow-md backdrop-blur">
      <h2 class="text-3xl font-semibold text-center mb-6">Why Choose Us?</h2>
      <ul class="space-y-4 text-lg">
        <li v-for="(item, i) in services" :key="i" class="flex items-center space-x-3 animate-pulse-once">
          <span class="text-green-500 text-xl">✔️</span><span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <!-- Trusted By -->
    <section class="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white/60 dark:bg-gray-800/70 rounded-xl shadow-md backdrop-blur">
      <h2 class="text-3xl font-semibold text-center mb-6">Trusted By</h2>
      <div class="flex justify-center flex-wrap gap-8">
        <img v-for="(logo,i) in partnerLogos" :key="i" :src="logo" alt="partner"
          class="w-24 filter grayscale hover:grayscale-0 transition" />
      </div>
    </section>
<!-- Developer Info -->
<section class="max-w-4xl mx-auto mt-12 px-6 py-6 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md backdrop-blur-sm text-center">
  <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Developed by</h2>
  <p class="text-gray-700 dark:text-gray-300">
    Email:
    <a href="mailto:samuelngari93@gmail.com" class="text-blue-600 dark:text-blue-400 hover:underline">
      samuelngari93@gmail.com
    </a><br>
    Phone:
    <a href="tel:+254752341183" class="text-blue-600 dark:text-blue-400 hover:underline">
      +254 752 341183
    </a>
  </p>
</section>

    <!-- Footer -->
    <footer class="bg-black text-white py-6 mt-12">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-4 md:space-y-0">
        <div>© 2025 BRIGHT TRADING LTD</div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-blue-400">Facebook</a>
          <a href="#" class="hover:text-blue-400">Twitter</a>
          <a href="#" class="hover:text-blue-400">Instagram</a>
        </div>
      </div>
    </footer>

    <!-- WhatsApp -->
    <div class="fixed bottom-5 right-5 z-50 animate-bounce-in">
      <a :href="whatsappLink" target="_blank"
        class="bg-green-500 text-white px-4 py-3 rounded-full shadow hover:bg-green-600 transition flex items-center space-x-2">
        <span>💬</span>
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
      drawerOpen: false,
      fullTitle: "BRIGHT TRADING LTD",
      typedTitle: "",
      typingIndex: 0,
      exchangeRates: [],
      services: [
        "Trusted & Licensed Money Exchanger",
        "Competitive exchange rates",
        "Fast processing & instant settlement",
        "Serves local and international clients",
        "Direct WhatsApp support",
        "Transparent pricing — no hidden charges",
      ],
      partnerLogos: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png?v=026",
      ],
      whatsappNumber: "254752341183",
      defaultMessage: "Hello BRIGHT TRADING LTD, I'm interested in your money exchange services."
    };
  },
  computed: {
    whatsappLink() {
      return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
    },
    typeTitle() {
      if (this.typingIndex < this.fullTitle.length) {
        this.typedTitle += this.fullTitle[this.typingIndex++];
        setTimeout(this.typeTitle, 100);
      }
    },
    getFlagIcon(rate) {
      return rate.flag === "crypto"
        ? "https://cryptologos.cc/logos/tether-usdt-logo.png?v=026"
        : `https://flagcdn.com/w40/${rate.flag}.png`;
    },
    async fetchExchangeRates() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/KES");
        const data = await response.json();
        const rates = data.rates;

        const currencies = [
          { code: "USD", currency: "US Dollar", flag: "us" },
          { code: "TZS", currency: "Tanzanian Shilling", flag: "tz" },
          { code: "UGX", currency: "Ugandan Shilling", flag: "ug" },
          { code: "GHS", currency: "Ghanaian Cedi", flag: "gh" },
          { code: "NGN", currency: "Nigerian Naira", flag: "ng" },
          { code: "KES", currency: "Kenyan Shilling", flag: "ke" },
          { code: "EUR", currency: "Euro", flag: "eu" },
          { code: "XOF", currency: "West African CFA Franc", flag: "sn" },
          { code: "GBP", currency: "British Pound", flag: "gb" },
          { code: "RMB", currency: "Chinese Yuan", flag: "cn" },
          { code: "USDT", currency: "Tether (Crypto)", flag: "crypto" },
          { code: "USDC", currency: "USD Coin (Crypto)", flag: "crypto" },
        ];

        this.exchangeRates = currencies.map((curr) => {
          let baseRate = rates[curr.code];
          if (!baseRate || curr.code === "KES") baseRate = 1;

          const buy = (1 / baseRate * 1.015).toFixed(2);   // 1.5% markup
          const sell = (1 / baseRate * 1.017).toFixed(2);  // 1.7% markup

          return {
            code: curr.code,
            currency: curr.currency,
            buy,
            sell,
            flag: curr.flag,
          };
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }
  },
  mounted() {
    this.typeTitle();
    this.fetchExchangeRates();
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) }
  to { opacity: 1; transform: translateY(0) }
}
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1) }
  50% { opacity: 0.7; transform: scale(1.05) }
}
.animate-pulse-once {
  animation: pulse 1.5s ease-out 1;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
