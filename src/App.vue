<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppSidebar from '@/layouts/global/AppSidebar.vue';

const router = useRouter();
const route = useRoute();
const isReady = ref(false);

const shouldShowSidebar = computed(() => {
  if (!isReady.value) return false;
  const now = route.name;
  return !router.options.routes.some((x) => x.meta?.layout === false && x.name === now);
});

onBeforeMount(async () => {
  await router.isReady();
  isReady.value = true;
});
</script>

<template>
  <div v-if="isReady">
    <AppSidebar v-if="shouldShowSidebar" />
    <router-view v-else />
  </div>
</template>
