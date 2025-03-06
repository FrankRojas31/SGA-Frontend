<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nueva Unidad"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Lista de unidades temáticas -->
    <div class="flex flex-wrap gap-4 justify-center">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="w-full sm:w-72 md:w-64 lg:w-60 overflow-hidden shadow-md"
      >
        <template #title>
          <span v-if="!card.isEditing">{{ card.title }}</span>
          <input
            v-else
            v-model="card.title"
            class="w-full p-1 border rounded text-sm"
          />
        </template>
        <template #subtitle>
          <span v-if="!card.isEditing">{{ card.subtitle }}</span>
          <input
            v-else
            v-model="card.subtitle"
            class="w-full p-1 border rounded text-sm"
          />
        </template>
        <template #content>
          <p v-if="!card.isEditing" class="m-0 text-sm text-gray-700">
            {{ card.content }}
          </p>
          <textarea
            v-else
            v-model="card.content"
            class="w-full p-1 border rounded text-sm"
            rows="2"
          ></textarea>
        </template>
        <template #footer>
          <div class="flex gap-2 mt-2">
            <Button
              v-if="!card.isEditing"
              label="Editar"
              severity="secondary"
              outlined
              class="w-full text-xs py-1"
              @click="editCard(index)"
            />
            <Button
              v-if="card.isEditing"
              label="Guardar"
              class="w-full text-xs py-1"
              @click="updateCard(index)"
            />
            <Button
              label="Eliminar"
              severity="danger"
              outlined
              class="w-full text-xs py-1"
              @click="confirmDelete(index)"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Swal from "sweetalert2";

// Interfaz para las unidades temáticas
interface UnitCard {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
  isEditing?: boolean;
}

const cards = ref<UnitCard[]>([
  {
    id: 1,
    title: "Álgebra Básica",
    subtitle: "Semestre 1",
    content: "Introducción a ecuaciones lineales y polinomios.",
  },
  {
    id: 2,
    title: "Geografía Mundial",
    subtitle: "Semestre 2",
    content: "Estudio de continentes, océanos y climas.",
  },
  {
    id: 3,
    title: "Literatura Clásica",
    subtitle: "Semestre 1",
    content: "Análisis de obras de Shakespeare y Cervantes.",
  },
]);

// Abrir modal para agregar una nueva unidad
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nueva Unidad Temática",
    html: `
      <input id="swal-title" class="swal2-input" placeholder="Título" />
      <input id="swal-subtitle" class="swal2-input" placeholder="Subtítulo" />
      <textarea id="swal-content" class="swal2-textarea" placeholder="Contenido"></textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const title = (document.getElementById("swal-title") as HTMLInputElement).value;
      const subtitle = (document.getElementById("swal-subtitle") as HTMLInputElement).value;
      const content = (document.getElementById("swal-content") as HTMLTextAreaElement).value;
      if (!title || !content) {
        Swal.showValidationMessage("Por favor, completa el título y el contenido.");
        return false;
      }
      return { title, subtitle, content };
    },
  });

  if (formValues) {
    await createUnit(formValues);
  }
};

// Crear una nueva unidad
const createUnit = async (unit: UnitCard) => {
  try {
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/units', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(unit),
    // });
    // const createdUnit = await response.json();

    const createdUnit = { ...unit, id: cards.value.length + 1 };
    cards.value.push(createdUnit);

    await Swal.fire({
      icon: "success",
      title: "¡Unidad creada!",
      text: `${createdUnit.title} ha sido agregada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear la unidad. Intenta de nuevo.",
    });
    console.error("Error al crear unidad:", error);
  }
};

// Habilitar edición de una unidad
const editCard = (index: number) => {
  cards.value[index].isEditing = true;
};

// Actualizar una unidad
const updateCard = async (index: number) => {
  const unitToUpdate = { ...cards.value[index], isEditing: false };
  if (!unitToUpdate.title || !unitToUpdate.content) {
    await Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa el título y el contenido.",
    });
    return;
  }

  try {
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/units/${unitToUpdate.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(unitToUpdate),
    // });
    // const updatedUnit = await response.json();

    cards.value[index] = unitToUpdate;

    await Swal.fire({
      icon: "success",
      title: "¡Unidad actualizada!",
      text: `${unitToUpdate.title} ha sido actualizada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar la unidad. Intenta de nuevo.",
    });
    console.error("Error al actualizar unidad:", error);
  }
};

// Confirmar eliminación de una unidad
const confirmDelete = async (index: number) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás "${cards.value[index].title}". Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deleteCard(index);
  }
};

// Eliminar una unidad
const deleteCard = async (index: number) => {
  const unitId = cards.value[index].id;
  const unitTitle = cards.value[index].title;
  try {
    // Simulación de llamada a la API
    // await fetch(`URL_API/units/${unitId}`, {
    //   method: 'DELETE',
    // });

    cards.value.splice(index, 1);

    await Swal.fire({
      icon: "success",
      title: "¡Unidad eliminada!",
      text: `${unitTitle} ha sido eliminada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la unidad. Intenta de nuevo.",
    });
    console.error("Error al eliminar unidad:", error);
  }
};

// Cargar unidades iniciales (Leer)
const loadUnits = async () => {
  try {
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/units');
    // const data = await response.json();
    // cards.value = data;

    console.log("Unidades cargadas:", cards.value);
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar las unidades.",
    });
    console.error("Error al cargar unidades:", error);
  }
};

// Cargar datos al montar el componente
loadUnits();
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
