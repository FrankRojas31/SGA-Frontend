<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goBack = () => {
    router.go(-1)
  }

  const contar = ref(5)
  let indice = 5
  setInterval(() => {
    if (contar.value > 0) {
      contar.value = --indice
    }
  }, 1000)

  setInterval(() => {
    if (contar.value === 0) {
      goBack()
    }
  }, 1000)
</script>

<template>
  <div class="h-screen w-screen bg-gray-50 flex items-center justify-center">
    <div
      class="container flex flex-col md:flex-row items-center justify-between px-5 py-8 text-gray-700"
    >
      <div class="w-full lg:w-1/2 mx-8 text-center">
        <div class="text-7xl text-green-500 font-bold mb-4">404</div>
        <p class="text-2xl md:text-3xl font-light leading-normal mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>

        <p class="text-lg mb-8">
          Serás redirigido en
          <span class="font-semibold text-green-600">{{ contar }} segundos.</span>
        </p>

        <button
          @click="goBack"
          class="px-5 py-3 text-sm font-medium leading-5 shadow-xl text-white transition-all duration-300 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
        >
          Regresar
        </button>
      </div>
      <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
        <img src="/40.svg" alt="Página no encontrada" class="max-w-full h-auto" />
      </div>
    </div>
  </div>
</template>
