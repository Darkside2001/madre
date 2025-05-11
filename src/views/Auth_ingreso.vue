<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-2 overflow-hidden">
    <div class="container max-w-full sm:w-full">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="panel flex flex-col items-center justify-center transition-all duration-500 ease-in-out sm:w-full sm:h-auto"
        :class="{ active: step === index + 1 }"
        @click="step !== index + 1 && setStep(index + 1)"
      >
        <transition name="fade-slide" mode="out-in">
          <div v-if="step === index + 1" :key="step" class="p-2 text-center text-white">
            <div v-if="step === 1">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <p class="text-lg">Para la mujer más fuerte y perseverante que hay...💖</p>
            </div>
            <div v-else-if="step === 2">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <p class="text-xl italic mb-2">“La cual me llena de orgullo de todo lo que ha logrado y sin la cual no sería el hombre que soy”</p>
              <img :src="image5" alt="Regalo" class="w-full max-w-xs mx-auto mb-4 rounded shadow" />
            </div>
            <div v-else-if="step === 3">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <img :src="image1" alt="Regalo" class="w-full max-w-xs mx-auto mb-4 rounded shadow" />
            </div>
            <div v-else-if="step === 4">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <img :src="image2" alt="Regalo" class="w-full max-w-xs mx-auto mb-4 rounded shadow" />
            </div>
            <div v-else-if="step === 5">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <p class="text-xl italic mb-2">“El pilar de esta familia...”</p>
              <img :src="image3" alt="Regalo" class="w-full max-w-xs mx-auto mb-4 rounded shadow" />
            </div>
            <div v-else-if="step === 6">
              <h2 class="text-2xl sm:text-xl font-bold text-pink-100 mb-4">🌷 Feliz Día de la Madre 🌷</h2>
              <div class="flex justify-center items-center">
                <div class="heart animate-pulse mt-4"></div>
              </div>
              <p class="mt-4 font-semibold">¡Nuestro corazón late por ti!</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/img/image1.jpg'
import image2 from '@/assets/img/image2.jpg'
import image3 from '@/assets/img/image3.jpg'
import image4 from '@/assets/img/image4.jpg'
import image5 from '@/assets/img/image5.jpg'

import variable from '@/js/auth/index.js';

export default {
  name: 'Madre',
  mixins: [variable],
  data() {
    return {
      step: 1,
      image1,
      image2,
      image3,
      image4,
      image5,
      cards: [
        { title: "Mensaje de Bienvenida" },
        { title: "Frase Célebre" },
        { title: "Regalo Especial" },
        { title: "Regalo Especial" },
        { title: "Regalo Especial" },
        { title: "Corazón" },
      ]
    }
  },
  methods: {
    setStep(index) {
      this.step = index
    },
    nextStep() {
      if (this.step < this.cards.length) this.step++
    },
    prevStep() {
      if (this.step > 1) this.step--
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  justify-content: center;
  gap: 1rem;
}

.panel {
  background-color: #f472b6;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 1s ease-in;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 16rem;
  height: auto;
  flex-grow: 1;
}

.panel.active {
  background-color: #ec4899;
  max-width: 100%;
}

@media (min-width: 640px) {
  .container {
    flex-wrap: nowrap;
    height: 60vh;
  }

  .panel {
    flex: 0.5;
    height: auto;
  }

  .panel.active {
    flex: 5;
  }
}

.panel h2,
.panel p {
  transition: opacity 0.3s ease;
}

/* Corazón */
.heart {
  width: 60px;
  height: 60px;
  background-color: #f50f0f;
  position: relative;
  transform: rotate(-45deg);
  border-radius: 10% 10% 0 0;
}

@media (min-width: 640px) {
  .heart {
    width: 80px;
    height: 80px;
  }
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: #f50f0f;
  border-radius: 50%;
}

.heart::before {
  top: -40px;
  left: 0;
}

.heart::after {
  left: 40px;
  top: 0;
}

/* Transiciones */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
