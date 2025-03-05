<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <Card v-for="(card, index) in cards" :key="index" style="width: 15rem; overflow: hidden">
      <template #header>
        <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template>
      <template #title>{{ card.title }}</template>
      <template #subtitle>{{ card.subtitle }}</template>
      <template #content>
        <p class="m-0 text-sm">
          {{ card.content }}
        </p>
      </template>
      <template #footer>
        <div class="flex gap-2 mt-1">
          <Button label="Cancel" severity="secondary" outlined class="w-full text-xs py-1" />
          <Button label="Save" class="w-full text-xs py-1" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const cards = ref([
  { title: "Card 1", subtitle: "Subtitle 1", content: "Contenido de la tarjeta 1." },
  { title: "Card 2", subtitle: "Subtitle 2", content: "Contenido de la tarjeta 2." },
  { title: "Card 3", subtitle: "Subtitle 3", content: "Contenido de la tarjeta 3." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 4", subtitle: "Subtitle 4", content: "Contenido de la tarjeta 4." },
  { title: "Card 5", subtitle: "Subtitle 5", content: "Contenido de la tarjeta 5." }
]);
</script>
