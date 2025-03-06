<script setup lang="ts">
import { useSidebarStore } from '@/stores/SidebarStore';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppLogo from "@/layouts/global/AppLogo.vue";
import { useAuthStore } from '@/stores/AuthStore'

const auth = useAuthStore();
const date = ref('');
const routesAll = useRouter();
const sidebar = useSidebarStore();
const routesWithFilter = computed(() => {
  return routesAll.options.routes.filter((x) => x.meta!.menu && x.name)
    .map(route => ({
      ...route,
      icon: route.meta?.icon || 'pi pi-circle'
    }));
});

const showSidebar = computed(() => {
  return sidebar.sidebar.open;
})

const horaReal = () => {
  const now = new Date();
  const formatDate = now.toLocaleDateString();
  const formatHours = now.toLocaleTimeString();

  date.value = `${formatDate} ${formatHours}`;
}

onMounted(() => {
  horaReal();
  setInterval(horaReal, 1000)
})

</script>

<template>
  <div class="relative flex min-h-screen bg-gray-100">
    <!-- Sidebar-->
    <div
      class="bg-gray-800 text-white w-[250px] space-y-5 px-4 absolute inset-y-0 left-0 md:relative transform transition duration-200 ease-in-out"
      :class="{ '-translate-x-full': !showSidebar, 'translate-x-0': showSidebar, 'relative': showSidebar }">
      <AppLogo :route="true" :redirect="'dashboard'"/>

      <nav class="mt-4">
        <RouterLink v-for="ruta in routesWithFilter" :key="ruta.path" :to="ruta.path"
          :class="{ 'bg-gray-700': $route.path === ruta.path }"
          class="mt-1 rounded-xs block px-4 py-3 hover:bg-gray-400">
          <i :class="ruta.icon" class="mr-2"></i>
          {{ ruta.meta?.title }}
        </RouterLink>
      </nav>
      <div class="mb-10">
      <button
        @click="auth.Logout"
        class="w-full rounded-xs px-4 py-3 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
      >
        <i class="pi pi-sign-out mr-2"></i>
        Cerrar Sesión
      </button>
    </div>
    </div>

    <!-- Main -->
    <div :class="{ 'md:ml-[-250px]': !showSidebar }" class="flex-1 transition-all duration-200 ease-in-out">
      <!-- Header -->
      <div class="flex bg-white shadow px-2 py-4">
        <button class="ml-4 hover:bg-gray-300 p-1 rounded-xs" @click="sidebar.ChangeSidebar()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div class="ml-auto mr-5 mt-1">
          {{ date }}
        </div>
      </div>


      <!-- Content -->
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
