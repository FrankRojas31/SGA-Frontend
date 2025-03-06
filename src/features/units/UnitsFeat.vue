<template>
  <AppSideBar>
    <div class="mt-5">
      <div class="font-semibold text-xl mb-4 text-center mt-4">UNIDADES</div>
      <div class="px-6">
    <UnitCardComponent/>
        </div>
  </div>
  </AppSideBar>
</template>

<script lang="ts" setup>
import UnitCardComponent from '@/components/units/UnitCardComponent.vue';
import AppSideBar from '@/layouts/navigation/AppSidebar.vue'
</script>
