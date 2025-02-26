<script lang="ts" setup>
import AppLogo from '@/layouts/global/AppLogo.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';

const auth = useAuthStore();
const password = ref('');
const email = ref('');

const SendParameters = () => {
  auth.Login(email.value, password.value);
};

</script>

<template>
  <div class="font-sans">
    <div
      class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 bg-[url('@/assets/images/background-login.jpg')]">
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="relative sm:max-w-sm w-full">
        <div class="card bg-gray-500 shadow-lg  w-full h-full rounded-3xl absolute transform -rotate-7"></div>
        <div class="card bg-gray-400 shadow-lg  w-full h-full rounded-3xl absolute transform rotate-6"></div>
        <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
          <AppLogo :route="false" />
          <label class="block mt-2 text-md text-gray-800 text-center font-semibold uppercase">
            Inicio Sesion
          </label>
          <form class="mt-2" @submit.prevent="SendParameters">
            <label class="block mb-2 text-sm font-medium">Correo Electronico</label>
            <div class="relative mb-4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input v-model="email" type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="ejemplo@gmail.com">
            </div>

            <label class="block mb-2 text-sm font-medium">Contraseña</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="size-5 text-gray-400">
                  <path fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input v-model="password" type="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="••••••••">
            </div>

            <div class="mt-7 flex">
              <label class="inline-flex items-center w-full cursor-pointer">
                <input type="checkbox" class="mt-1" name="remember">
                <span class="ml-1 text-sm text-gray-600">
                  Recuerdame
                </span>
              </label>

              <div class="w-full text-right">
                <a class="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>

            <div class="mt-4">
              <button type="submit"
                class="bg-gray-500 w-full py-3 rounded-md text-white shadow-xl transition duration-300 ease-in-out transform hover:-translate-x hover:scale-101 hover:bg-gray-600">
                Iniciar Sesión
              </button>
            </div>
            <div class="text-center w-full mt-3 mb-3">
              <label class="text-sm">¿No tienes cuenta? </label>
              <RouterLink to="/register" class="underline text-sm text-gray-600 hover:text-gray-900">
                Registrate
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
