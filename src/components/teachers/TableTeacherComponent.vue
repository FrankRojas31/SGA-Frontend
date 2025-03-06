<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nuevo Profesor"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de profesores -->
    <div class="card">
      <DataTable
        :value="teachers"
        scrollable
        scrollHeight="780px"
        class="mt-6"
        :loading="loading"
      >
        <Column field="nombre" header="Nombre" style="min-width: 120px" frozen class="font-bold"></Column>
        <Column field="apellidoPaterno" header="Apellido Paterno" style="min-width: 120px"></Column>
        <Column field="apellidoMaterno" header="Apellido Materno" style="min-width: 120px"></Column>
        <Column field="especialidad" header="Especialidad" style="min-width: 150px"></Column>
        <Column field="grado" header="Grado" style="min-width: 120px"></Column>
        <Column field="cedula" header="Cédula" style="min-width: 120px"></Column>
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

// Interfaz para los profesores
interface Teacher {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  especialidad: string;
  grado: string;
  cedula: string;
}

// Estado para los profesores
const teachers = ref<Teacher[]>([
  {
    id: 1,
    nombre: "Laura",
    apellidoPaterno: "Hernández",
    apellidoMaterno: "Díaz",
    especialidad: "Matemáticas",
    grado: "Maestría",
    cedula: "M123456",
  },
  {
    id: 2,
    nombre: "Pedro",
    apellidoPaterno: "Martínez",
    apellidoMaterno: "Soto",
    especialidad: "Historia",
    grado: "Licenciatura",
    cedula: "H789012",
  },
  {
    id: 3,
    nombre: "Sofía",
    apellidoPaterno: "Gómez",
    apellidoMaterno: "Reyes",
    especialidad: "Biología",
    grado: "Doctorado",
    cedula: "B345678",
  },
]);

const loading = ref(false);

// Abrir modal para agregar un nuevo profesor
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nuevo Profesor",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" placeholder="Apellido Materno" />
      <input id="swal-especialidad" class="swal2-input" placeholder="Especialidad" />
      <input id="swal-grado" class="swal2-input" placeholder="Grado" />
      <input id="swal-cedula" class="swal2-input" placeholder="Cédula" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const apellidoPaterno = (document.getElementById("swal-apellidoPaterno") as HTMLInputElement).value;
      const apellidoMaterno = (document.getElementById("swal-apellidoMaterno") as HTMLInputElement).value;
      const especialidad = (document.getElementById("swal-especialidad") as HTMLInputElement).value;
      const grado = (document.getElementById("swal-grado") as HTMLInputElement).value;
      const cedula = (document.getElementById("swal-cedula") as HTMLInputElement).value;

      if (!nombre || !apellidoPaterno || !apellidoMaterno || !especialidad || !grado || !cedula) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      return { nombre, apellidoPaterno, apellidoMaterno, especialidad, grado, cedula };
    },
  });

  if (formValues) {
    await createTeacher(formValues);
  }
};

// Crear un nuevo profesor
const createTeacher = async (teacher: Omit<Teacher, "id">) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/teachers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(teacher),
    // });
    // const createdTeacher = await response.json();

    const createdTeacher = { ...teacher, id: teachers.value.length + 1 };
    teachers.value.push(createdTeacher);

    await Swal.fire({
      icon: "success",
      title: "¡Profesor creado!",
      text: `${createdTeacher.nombre} ${createdTeacher.apellidoPaterno} ha sido agregado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el profesor. Intenta de nuevo.",
    });
    console.error("Error al crear profesor:", error);
  } finally {
    loading.value = false;
  }
};

// Abrir modal para editar un profesor
const openEditModal = async (index: number) => {
  const teacher = teachers.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Profesor",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${teacher.nombre}" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" value="${teacher.apellidoPaterno}" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" value="${teacher.apellidoMaterno}" placeholder="Apellido Materno" />
      <input id="swal-especialidad" class="swal2-input" value="${teacher.especialidad}" placeholder="Especialidad" />
      <input id="swal-grado" class="swal2-input" value="${teacher.grado}" placeholder="Grado" />
      <input id="swal-cedula" class="swal2-input" value="${teacher.cedula}" placeholder="Cédula" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const apellidoPaterno = (document.getElementById("swal-apellidoPaterno") as HTMLInputElement).value;
      const apellidoMaterno = (document.getElementById("swal-apellidoMaterno") as HTMLInputElement).value;
      const especialidad = (document.getElementById("swal-especialidad") as HTMLInputElement).value;
      const grado = (document.getElementById("swal-grado") as HTMLInputElement).value;
      const cedula = (document.getElementById("swal-cedula") as HTMLInputElement).value;

      if (!nombre || !apellidoPaterno || !apellidoMaterno || !especialidad || !grado || !cedula) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      return { nombre, apellidoPaterno, apellidoMaterno, especialidad, grado, cedula };
    },
  });

  if (formValues) {
    await updateTeacher(index, { ...formValues, id: teacher.id });
  }
};

// Actualizar un profesor
const updateTeacher = async (index: number, updatedTeacher: Teacher) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/teachers/${updatedTeacher.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedTeacher),
    // });
    // const updated = await response.json();

    teachers.value[index] = updatedTeacher;

    await Swal.fire({
      icon: "success",
      title: "¡Profesor actualizado!",
      text: `${updatedTeacher.nombre} ${updatedTeacher.apellidoPaterno} ha sido actualizado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el profesor. Intenta de nuevo.",
    });
    console.error("Error al actualizar profesor:", error);
  } finally {
    loading.value = false;
  }
};

// Confirmar eliminación de un profesor
const confirmDelete = async (index: number) => {
  const teacher = teachers.value[index];
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás a "${teacher.nombre} ${teacher.apellidoPaterno} ${teacher.apellidoMaterno}". Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deleteTeacher(index);
  }
};

// Eliminar un profesor
const deleteTeacher = async (index: number) => {
  const teacher = teachers.value[index];
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // await fetch(`URL_API/teachers/${teacher.id}`, {
    //   method: 'DELETE',
    // });

    teachers.value.splice(index, 1);

    await Swal.fire({
      icon: "success",
      title: "¡Profesor eliminado!",
      text: `${teacher.nombre} ${teacher.apellidoPaterno} ha sido eliminado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el profesor. Intenta de nuevo.",
    });
    console.error("Error al eliminar profesor:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar profesores iniciales (Leer)
const loadTeachers = async () => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/teachers');
    // const data = await response.json();
    // teachers.value = data;

    console.log("Profesores cargados:", teachers.value);
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los profesores.",
    });
    console.error("Error al cargar profesores:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar datos al montar el componente
loadTeachers();
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
