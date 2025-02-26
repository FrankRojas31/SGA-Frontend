<script setup lang="ts">



</script>

<template>
  <div v-for="i in 4" :key="i" class="p-4 transition-shadow border-gray-800 rounded-lg shadow-sm hover:shadow-lg">
    <div class="flex items-start justify-between">
      <div class="flex flex-col space-y-2">
        <span class="text-gray-400">Total Users</span>
        <span class="text-lg font-semibold">100,221</span>
      </div>
      <div class="p-10 bg-gray-200 rounded-md"></div>
    </div>
    <div>
      <span class="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
      <span>from 2019</span>
    </div>
  </div>
</template>
