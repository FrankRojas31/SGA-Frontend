<script lang="ts" setup>
import ModalCrud from "@/layouts/modals/ModalCrud.vue";
import { ref } from "vue";

defineProps<{
  openModal: boolean;
}>();

</script>

<template>
  <ModalCrud :show="openModal" @close="showModal = false">
  <form @submit.prevent="">
    <div class="mb-4">
      <label class="block font-medium">Nombre</label>
      <input v-model="form.name" type="text" class="w-full border p-2 rounded" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium">Correo Electrónico</label>
      <input v-model="form.email" type="email" class="w-full border p-2 rounded" required />
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
  </form>
</ModalCrud>
</template>
