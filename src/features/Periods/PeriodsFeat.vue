<script setup lang="ts">
  import CardPeriod from '@/components/periods/CardPeriod.vue'
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
</script>
<template>
  <AppSidebar>
    <div class="font-semibold text-xl mb-4 text-center mt-4">PERIODOS</div>
      <CardPeriod class="px-6" />
  </AppSidebar>
</template>
