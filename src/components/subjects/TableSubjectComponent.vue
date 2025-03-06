<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nueva Materia"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de materias -->
    <div class="card">
      <DataTable
        :value="subjects"
        scrollable
        scrollHeight="780px"
        class="mt-6"
        :loading="loading"
      >
        <Column field="nombre" header="Nombre" style="min-width: 150px" frozen class="font-bold"></Column>
        <Column field="descripcion" header="Descripción" style="min-width: 100px"></Column>
        <!-- <Column field="horasSemanales" header="Horas Semanales" style="min-width: 120px"></Column>
        <Column field="clave" header="Clave" style="min-width: 120px"></Column> -->
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
import { GetSubject, PostSubject, UpdateSubject, DeleteSubject } from '@/api/clients/subjects/subjectClient'
import type { ISubject } from '@/types/Subjects'

const subjects = ref<ISubject[]>([]);
const loading = ref(false);

const loadSubjects = async () => {
  try {
    loading.value = true;
    const response = await GetSubject();
    subjects.value = response.data.data;
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar las materias.",
    });
    console.error("Error al cargar materias:", error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nueva Materia",
    html: `
      <div>
        <label for="swal-nombre">Nombre:</label>
        <input type="text" id="swal-nombre" class="swal2-input" placeholder="Nombre de la materia" required/>
      </div>
      <div class="mt-3">
        <label for="swal-descripcion">Descripción:</label>
        <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción de la materia" required></textarea>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("swal-descripcion") as HTMLTextAreaElement).value;
      if (!nombre || !descripcion) {
        Swal.showValidationMessage("Por favor ingresa el nombre y la descripción.");
        return false;
      }
      return { nombre, descripcion };
    },
  });

  if (formValues) {
    await createSubject(formValues);
  }
};

const createSubject = async (subject: ISubject) => {
  try {
    loading.value = true;
    await PostSubject(subject);
    subjects.value.push(subject);
    await Swal.fire({
      icon: "success",
      title: "¡Materia creada!",
      text: `${subject.nombre} ha sido agregada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear la materia. Intenta de nuevo.",
    });
    console.error("Error al crear materia:", error);
  } finally {
    loading.value = false;
  }
};

const openEditModal = async (index: number) => {
  const subject = subjects.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Materia",
    html: `
      <div>
        <label for="swal-nombre">Nombre:</label>
        <input type="text" id="swal-nombre" class="swal2-input" value="${subject.nombre}" required/>
      </div>
      <div class="mt-3">
        <label for="swal-descripcion">Descripción:</label>
        <textarea id="swal-descripcion" class="swal2-textarea" required>${subject.descripcion}</textarea>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("swal-descripcion") as HTMLTextAreaElement).value;
      if (!nombre || !descripcion) {
        Swal.showValidationMessage("Por favor ingresa el nombre y la descripción.");
        return false;
      }
      return { id: subject.id, nombre, descripcion };
    },
  });

  if (formValues) {
    await updateSubject(index, formValues);
  }
};

const updateSubject = async (index: number, updatedSubject: ISubject) => {
  try {
    loading.value = true;
    await UpdateSubject(updatedSubject);
    subjects.value[index] = updatedSubject;
    await Swal.fire({
      icon: "success",
      title: "¡Materia actualizada!",
      text: `${updatedSubject.nombre} ha sido actualizada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar la materia. Intenta de nuevo.",
    });
    console.error("Error al actualizar materia:", error);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async (index: number) => {
  const subject = subjects.value[index];
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás "${subject.nombre}" (Clave: ${subject.clave}). Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deleteSubject(index);
  }
};

const deleteSubject = async (index: number) => {
  const subject = subjects.value[index];
  try {
    loading.value = true;
    await DeleteSubject(subject.id);
    subjects.value.splice(index, 1);
    await Swal.fire({
      icon: "success",
      title: "¡Materia eliminada!",
      text: `${subject.nombre} ha sido eliminada exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la materia. Intenta de nuevo.",
    });
    console.error("Error al eliminar materia:", error);
  } finally {
    loading.value = false;
  }
};

loadSubjects();
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
