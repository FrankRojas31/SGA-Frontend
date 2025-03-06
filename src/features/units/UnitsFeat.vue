<template>
  <AppSideBar>
    <div class="mt-5">
      <p class="text-2xl text-center font-medium">UNIDADES</p>
      <div class="px-6 py-7">
    <CardPeriod/>
        </div>
  </div>
  </AppSideBar>
</template>

<script lang="ts" setup>
import AppSideBar from '@/layouts/navigation/AppSidebar.vue'
import CardPeriod from '@/components/periods/CardPeriod.vue'
</script>
