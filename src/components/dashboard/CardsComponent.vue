<template>
  <div class="bg-white shadow p-4 rounded-md">
    <div class="flex justify-between mb-4">
      <div>
        <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">{{ props.title }}</span>
        <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">{{ props.count }}</div>
      </div>
      <div class="flex items-center justify-center bg-blue-400/30 rounded-md w-10 h-10">
        <i :class="props.icon" class="text-blue-500 !text-xl"></i>
      </div>
    </div>
    <span class="text-green-500 font-medium">+{{ props.new }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
  count: number
  new: string
  icon: string
}>();
</script>
