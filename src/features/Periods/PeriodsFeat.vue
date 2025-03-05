<template>
  <AppSideBar>
    <div class="mt-5">
      <p class="text-2xl text-center font-medium mb-4">PERIODOS</p>
      <div class="p-10">
    <CardPeriod/>
        </div>
  </div>
  </AppSideBar>
</template>

<script lang="ts" setup>
import AppSideBar from '@/layouts/navigation/AppSidebar.vue'
import CardPeriod from '@/components/periods/CardPeriod.vue'
</script>
