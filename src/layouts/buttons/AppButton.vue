<script lang="ts" setup>
defineProps<{
  label: string;
  color?: string;
}>();

const emit = defineEmits<{ (e: "click", value: boolean): void }>();

const handleClick = () => {
  emit("click", true);
};
</script>

<template>
  <button
    :class="`px-4 py-2 rounded text-white ${color || 'bg-green-600 hover:bg-green-700'}`"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>
