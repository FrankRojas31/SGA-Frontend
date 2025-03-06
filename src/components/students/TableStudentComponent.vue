<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nuevo Estudiante"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de estudiantes -->
    <div class="card">
      <DataTable
        :value="students"
        scrollable
        scrollHeight="780px"
        class="mt-6"
        :loading="loading"
      >
        <Column field="nombre" header="Nombre" style="min-width: 120px" frozen class="font-bold"></Column>
        <Column field="apellidoPaterno" header="Apellido Paterno" style="min-width: 120px"></Column>
        <Column field="apellidoMaterno" header="Apellido Materno" style="min-width: 120px"></Column>
        <Column field="matricula" header="Matrícula" style="min-width: 120px"></Column>
        <Column field="grupo" header="Grupo" style="min-width: 120px">
          <template #body="{ data }">
            {{ data.grupo || 'Sin grupo' }}
          </template>
        </Column>
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
import Swal from "sweetalert2";

// Interfaz para los estudiantes
interface Student {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  grupo?: string;
}

// Estado para los estudiantes
const students = ref<Student[]>([
  {
    id: 1,
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "Gómez",
    matricula: "A123456",
    grupo: "1A",
  },
  {
    id: 2,
    nombre: "María",
    apellidoPaterno: "López",
    apellidoMaterno: "Martínez",
    matricula: "B789012",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellidoPaterno: "García",
    apellidoMaterno: "Rodríguez",
    matricula: "C345678",
    grupo: "2B",
  },
]);

const loading = ref(false);

// Abrir modal para agregar un nuevo estudiante
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nuevo Estudiante",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" placeholder="Apellido Materno" />
      <input id="swal-matricula" class="swal2-input" placeholder="Matrícula" />
      <input id="swal-grupo" class="swal2-input" placeholder="Grupo (opcional)" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const apellidoPaterno = (document.getElementById("swal-apellidoPaterno") as HTMLInputElement).value;
      const apellidoMaterno = (document.getElementById("swal-apellidoMaterno") as HTMLInputElement).value;
      const matricula = (document.getElementById("swal-matricula") as HTMLInputElement).value;
      const grupo = (document.getElementById("swal-grupo") as HTMLInputElement).value || undefined;

      if (!nombre || !apellidoPaterno || !apellidoMaterno || !matricula) {
        Swal.showValidationMessage("Por favor, completa los campos obligatorios.");
        return false;
      }
      return { nombre, apellidoPaterno, apellidoMaterno, matricula, grupo };
    },
  });

  if (formValues) {
    await createStudent(formValues);
  }
};

// Crear un nuevo estudiante
const createStudent = async (student: Omit<Student, "id">) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/students', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(student),
    // });
    // const createdStudent = await response.json();

    const createdStudent = { ...student, id: students.value.length + 1 };
    students.value.push(createdStudent);

    await Swal.fire({
      icon: "success",
      title: "¡Estudiante creado!",
      text: `${createdStudent.nombre} ${createdStudent.apellidoPaterno} ha sido agregado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el estudiante. Intenta de nuevo.",
    });
    console.error("Error al crear estudiante:", error);
  } finally {
    loading.value = false;
  }
};

// Abrir modal para editar un estudiante
const openEditModal = async (index: number) => {
  const student = students.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Estudiante",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${student.nombre}" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" value="${student.apellidoPaterno}" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" value="${student.apellidoMaterno}" placeholder="Apellido Materno" />
      <input id="swal-matricula" class="swal2-input" value="${student.matricula}" placeholder="Matrícula" />
      <input id="swal-grupo" class="swal2-input" value="${student.grupo || ''}" placeholder="Grupo (opcional)" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const apellidoPaterno = (document.getElementById("swal-apellidoPaterno") as HTMLInputElement).value;
      const apellidoMaterno = (document.getElementById("swal-apellidoMaterno") as HTMLInputElement).value;
      const matricula = (document.getElementById("swal-matricula") as HTMLInputElement).value;
      const grupo = (document.getElementById("swal-grupo") as HTMLInputElement).value || undefined;

      if (!nombre || !apellidoPaterno || !apellidoMaterno || !matricula) {
        Swal.showValidationMessage("Por favor, completa los campos obligatorios.");
        return false;
      }
      return { nombre, apellidoPaterno, apellidoMaterno, matricula, grupo };
    },
  });

  if (formValues) {
    await updateStudent(index, { ...formValues, id: student.id });
  }
};

// Actualizar un estudiante
const updateStudent = async (index: number, updatedStudent: Student) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/students/${updatedStudent.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedStudent),
    // });
    // const updated = await response.json();

    students.value[index] = updatedStudent;

    await Swal.fire({
      icon: "success",
      title: "¡Estudiante actualizado!",
      text: `${updatedStudent.nombre} ${updatedStudent.apellidoPaterno} ha sido actualizado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el estudiante. Intenta de nuevo.",
    });
    console.error("Error al actualizar estudiante:", error);
  } finally {
    loading.value = false;
  }
};

// Confirmar eliminación de un estudiante
const confirmDelete = async (index: number) => {
  const student = students.value[index];
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás a "${student.nombre} ${student.apellidoPaterno} ${student.apellidoMaterno}". Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deleteStudent(index);
  }
};

// Eliminar un estudiante
const deleteStudent = async (index: number) => {
  const student = students.value[index];
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // await fetch(`URL_API/students/${student.id}`, {
    //   method: 'DELETE',
    // });

    students.value.splice(index, 1);

    await Swal.fire({
      icon: "success",
      title: "¡Estudiante eliminado!",
      text: `${student.nombre} ${student.apellidoPaterno} ha sido eliminado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el estudiante. Intenta de nuevo.",
    });
    console.error("Error al eliminar estudiante:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar estudiantes iniciales (Leer)
const loadStudents = async () => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/students');
    // const data = await response.json();
    // students.value = data;

    console.log("Estudiantes cargados:", students.value);
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los estudiantes.",
    });
    console.error("Error al cargar estudiantes:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar datos al montar el componente
loadStudents();
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
