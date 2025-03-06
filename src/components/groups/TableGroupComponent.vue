<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button label="Agregar Nuevo Grupo" class="w-full sm:w-auto text-sm py-2" @click="openCreateModal" />
    </div>

    <!-- Tabla de grupos -->
    <div class="card">
      <DataTable :value="groups" scrollable scrollHeight="780px" class="mt-6" :loading="loading">
        <Column field="nombre" header="Nombre" style="min-width: 150px" frozen class="font-bold"></Column>
        <Column field="descripcion" header="Descripción" style="min-width: 200px"></Column>
        <Column header="Acciones" style="min-width: 150px">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button label="Editar" severity="secondary" outlined class="text-xs py-1" @click="openEditModal(data)" />
              <Button label="Eliminar" severity="danger" outlined class="text-xs py-1" @click="confirmDelete(data.id)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Swal from "sweetalert2";
import { GetGroups, PostGroup, UpdateGroup, DeleteGroup } from "@/api/clients/groups/groupsClient";
import type { IGroups } from "@/types/Groups";


const groups = ref<IGroups[]>([]);
const loading = ref(false);


const loadGroups = async () => {
  try {
    loading.value = true;
    const response = await GetGroups();

    if (response.data.success && Array.isArray(response.data.data)) {
      groups.value = response.data.data.filter(group => !group.esBorrado);
    } else {
      console.error("Error en formato de respuesta:", response.data);
    }
  } catch (error) {
    console.error("Error al cargar grupos:", error);
    Swal.fire("Error", "No se pudieron cargar los grupos.", "error");
  } finally {
    loading.value = false;
  }
};


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
      return nombre && descripcion ? { nombre, descripcion } : Swal.showValidationMessage("Completa todos los campos");
    },
  });

  if (formValues) await createGroup(formValues);
};

const createGroup = async (group: Omit<IGroups, "id">) => {
  try {
    loading.value = true;
    const response = await PostGroup(group);

    if (response.data.success) {
      groups.value.push(response.data.data);
      Swal.fire("¡Grupo creado!", "El grupo ha sido agregado exitosamente.", "success");
    } else {
      throw new Error("No se pudo crear el grupo.");
    }
  } catch (error) {
    console.error("Error al crear grupo:", error);
    Swal.fire("Error", "No se pudo crear el grupo.", "error");
  } finally {
    loading.value = false;
  }
};

const openEditModal = async (group: IGroups) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar Grupo",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${group.nombre}" />
      <textarea id="swal-descripcion" class="swal2-textarea">${group.descripcion}</textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("swal-descripcion") as HTMLTextAreaElement).value;
      return nombre && descripcion ? { id: group.id, nombre, descripcion } : Swal.showValidationMessage("Completa todos los campos");
    },
  });

  if (formValues) await updateGroup(formValues);
};

const updateGroup = async (updatedGroup: IGroups) => {
  try {
    loading.value = true;
    const response = await UpdateGroup(updatedGroup);

    if (response.data.success) {
      const index = groups.value.findIndex(g => g.id === updatedGroup.id);
      if (index !== -1) groups.value[index] = response.data.data;
      Swal.fire("¡Grupo actualizado!", "Los cambios han sido guardados.", "success");
    } else {
      throw new Error("No se pudo actualizar el grupo.");
    }
  } catch (error) {
    console.error("Error al actualizar grupo:", error);
    Swal.fire("Error", "No se pudo actualizar el grupo.", "error");
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async (id: number) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Eliminar grupo?",
    text: "Esta acción no se puede deshacer.",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) await deleteGroup(id);
};

const deleteGroup = async (id: number) => {
  try {
    loading.value = true;
    const response = await DeleteGroup(id);

    if (response.data.success) {
      groups.value = groups.value.filter(group => group.id !== id);
      Swal.fire("¡Grupo eliminado!", "El grupo ha sido eliminado correctamente.", "success");
    } else {
      throw new Error("No se pudo eliminar el grupo.");
    }
  } catch (error) {
    console.error("Error al eliminar grupo:", error);
    Swal.fire("Error", "No se pudo eliminar el grupo.", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(loadGroups);
</script>
