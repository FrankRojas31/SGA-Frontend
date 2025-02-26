<script lang="ts" setup>
defineProps<{
  show: boolean;
}>();
defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative animate-fadeIn">
          <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-600 text-2xl">
            &times;
          </button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
