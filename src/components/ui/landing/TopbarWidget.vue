<script lang="ts" setup>
import AppLogo from '@/layouts/global/AppLogo.vue'
import { RouterLink } from 'vue-router';
function smoothScroll(id: string) {
  document.body.click();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
</script>

<template>
  <a class="flex items-center" href="#">
    <AppLogo class="mr-20" :route="false" />
  </a>
  <Button class="lg:!hidden" text severity="secondary" rounded
    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
    <i class="pi pi-bars !text-2xl"></i>
  </Button>
  <div
    class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
    <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
      <li>
        <a @click="smoothScroll('hero')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
          <span>Inicio</span>
        </a>
      </li>
      <li>
        <a @click="smoothScroll('features')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
          <span>Características</span>
        </a>
      </li>
      <li>
        <a @click="smoothScroll('highlights')"
          class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
          <span>Destacados</span>
        </a>
      </li>
    </ul>
    <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
      <RouterLink to="/login">
        <Button label="Iniciar sesión" rounded-sm></Button>
      </RouterLink>
      <RouterLink to="/register">
        <Button label="Registrarse" rounded-sm></Button>
      </RouterLink>
    </div>
  </div>
</template>
