<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nuevo Grupo"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de grupos -->
    <div class="card">
      <DataTable
        :value="groups"
        scrollable
        scrollHeight="780px"
        class="mt-6"
        :loading="loading"
      >
        <Column field="nombre" header="Nombre" style="min-width: 150px" frozen class="font-bold"></Column>
        <Column field="descripcion" header="Descripción" style="min-width: 200px"></Column>
        <Column header="Acciones" style="min-width: 150px">
          <template #body="{ index }">
            <div class="flex gap-2">
              <Button
                label="Editar"
                severity="secondary"
                outlined
                class="text-xs py-1"
                @click="openEditModal(index)"
              />
              <Button
                label="Eliminar"
                severity="danger"
                outlined
                class="text-xs py-1"
                @click="confirmDelete(index)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Swal from "sweetalert2";

// Interfaz para los grupos
interface Group {
  id: number;
  nombre: string;
  descripcion: string;
}

// Estado para los grupos
const groups = ref<Group[]>([
  {
    id: 1,
    nombre: "Grupo 1A",
    descripcion: "Grupo de primer semestre, turno matutino.",
  },
  {
    id: 2,
    nombre: "Grupo 2B",
    descripcion: "Grupo de segundo semestre, turno vespertino.",
  },
  {
    id: 3,
    nombre: "Grupo 3C",
    descripcion: "Grupo de tercer semestre, especialidad en ciencias.",
  },
]);

const loading = ref(false);

// Abrir modal para agregar un nuevo grupo
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nuevo Grupo",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("swal-descripcion") as HTMLTextAreaElement).value;

      if (!nombre || !descripcion) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      return { nombre, descripcion };
    },
  });

  if (formValues) {
    await createGroup(formValues);
  }
};

// Crear un nuevo grupo
const createGroup = async (group: Omit<Group, "id">) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/groups', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(group),
    // });
    // const createdGroup = await response.json();

    const createdGroup = { ...group, id: groups.value.length + 1 };
    groups.value.push(createdGroup);

    await Swal.fire({
      icon: "success",
      title: "¡Grupo creado!",
      text: `${createdGroup.nombre} ha sido agregado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el grupo. Intenta de nuevo.",
    });
    console.error("Error al crear grupo:", error);
  } finally {
    loading.value = false;
  }
};

// Abrir modal para editar un grupo
const openEditModal = async (index: number) => {
  const group = groups.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Grupo",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${group.nombre}" placeholder="Nombre" />
      <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción">${group.descripcion}</textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("swal-descripcion") as HTMLTextAreaElement).value;

      if (!nombre || !descripcion) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      return { nombre, descripcion };
    },
  });

  if (formValues) {
    await updateGroup(index, { ...formValues, id: group.id });
  }
};

// Actualizar un grupo
const updateGroup = async (index: number, updatedGroup: Group) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/groups/${updatedGroup.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedGroup),
    // });
    // const updated = await response.json();

    groups.value[index] = updatedGroup;

    await Swal.fire({
      icon: "success",
      title: "¡Grupo actualizado!",
      text: `${updatedGroup.nombre} ha sido actualizado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el grupo. Intenta de nuevo.",
    });
    console.error("Error al actualizar grupo:", error);
  } finally {
    loading.value = false;
  }
};

// Confirmar eliminación de un grupo
const confirmDelete = async (index: number) => {
  const group = groups.value[index];
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás "${group.nombre}". Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deleteGroup(index);
  }
};

// Eliminar un grupo
const deleteGroup = async (index: number) => {
  const group = groups.value[index];
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // await fetch(`URL_API/groups/${group.id}`, {
    //   method: 'DELETE',
    // });

    groups.value.splice(index, 1);

    await Swal.fire({
      icon: "success",
      title: "¡Grupo eliminado!",
      text: `${group.nombre} ha sido eliminado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el grupo. Intenta de nuevo.",
    });
    console.error("Error al eliminar grupo:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar grupos iniciales (Leer)
const loadGroups = async () => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/groups');
    // const data = await response.json();
    // groups.value = data;

    console.log("Grupos cargados:", groups.value);
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los grupos.",
    });
    console.error("Error al cargar grupos:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar datos al montar el componente
loadGroups();
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 640px) {
  .p-4 {
    padding: 1rem;
  }
  .text-xs {
    font-size: 0.65rem;
  }
}
</style>
