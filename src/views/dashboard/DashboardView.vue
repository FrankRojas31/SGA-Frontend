<script lang="ts" setup>
import AppButton from '@/layouts/buttons/AppButton.vue';
import AppCards from '@/layouts/cards/AppCards.vue';
import UserTable from '@/layouts/tables/UserTable.vue';

</script>

<template>
  <h1 class="text-xl font-bold">Dashboard</h1>

  <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
    <AppCards />
  </div>

  <h3 class="mt-10 text-xl font-bold">Usuarios</h3>

  <div class="flex justify-end mt-4">
    <AppButton label="Agregar Usuario"/>
  </div>

  <UserTable/>

</template>
