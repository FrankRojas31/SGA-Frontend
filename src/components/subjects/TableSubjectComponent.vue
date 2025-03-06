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
        <Column field="creditos" header="Créditos" style="min-width: 100px"></Column>
        <Column field="horasSemanales" header="Horas Semanales" style="min-width: 120px"></Column>
        <Column field="clave" header="Clave" style="min-width: 120px"></Column>
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

// Interfaz para las materias
interface Subject {
  id: number;
  nombre: string;
  creditos: number;
  horasSemanales: number;
  clave: string;
}

// Estado para las materias
const subjects = ref<Subject[]>([
  {
    id: 1,
    nombre: "Álgebra Lineal",
    creditos: 6,
    horasSemanales: 4,
    clave: "MAT101",
  },
  {
    id: 2,
    nombre: "Historia Universal",
    creditos: 4,
    horasSemanales: 3,
    clave: "HIS201",
  },
  {
    id: 3,
    nombre: "Biología Molecular",
    creditos: 8,
    horasSemanales: 5,
    clave: "BIO301",
  },
]);

const loading = ref(false);

// Abrir modal para agregar una nueva materia
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nueva Materia",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <input id="swal-creditos" class="swal2-input" type="number" placeholder="Créditos" />
      <input id="swal-horasSemanales" class="swal2-input" type="number" placeholder="Horas Semanales" />
      <input id="swal-clave" class="swal2-input" placeholder="Clave" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const creditos = Number((document.getElementById("swal-creditos") as HTMLInputElement).value);
      const horasSemanales = Number((document.getElementById("swal-horasSemanales") as HTMLInputElement).value);
      const clave = (document.getElementById("swal-clave") as HTMLInputElement).value;

      if (!nombre || !creditos || !horasSemanales || !clave) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      if (creditos <= 0 || horasSemanales <= 0) {
        Swal.showValidationMessage("Créditos y Horas Semanales deben ser mayores a 0.");
        return false;
      }
      return { nombre, creditos, horasSemanales, clave };
    },
  });

  if (formValues) {
    await createSubject(formValues);
  }
};

// Crear una nueva materia
const createSubject = async (subject: Omit<Subject, "id">) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/subjects', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(subject),
    // });
    // const createdSubject = await response.json();

    const createdSubject = { ...subject, id: subjects.value.length + 1 };
    subjects.value.push(createdSubject);

    await Swal.fire({
      icon: "success",
      title: "¡Materia creada!",
      text: `${createdSubject.nombre} ha sido agregada exitosamente.`,
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

// Abrir modal para editar una materia
const openEditModal = async (index: number) => {
  const subject = subjects.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Materia",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${subject.nombre}" placeholder="Nombre" />
      <input id="swal-creditos" class="swal2-input" type="number" value="${subject.creditos}" placeholder="Créditos" />
      <input id="swal-horasSemanales" class="swal2-input" type="number" value="${subject.horasSemanales}" placeholder="Horas Semanales" />
      <input id="swal-clave" class="swal2-input" value="${subject.clave}" placeholder="Clave" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const creditos = Number((document.getElementById("swal-creditos") as HTMLInputElement).value);
      const horasSemanales = Number((document.getElementById("swal-horasSemanales") as HTMLInputElement).value);
      const clave = (document.getElementById("swal-clave") as HTMLInputElement).value;

      if (!nombre || !creditos || !horasSemanales || !clave) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      if (creditos <= 0 || horasSemanales <= 0) {
        Swal.showValidationMessage("Créditos y Horas Semanales deben ser mayores a 0.");
        return false;
      }
      return { nombre, creditos, horasSemanales, clave };
    },
  });

  if (formValues) {
    await updateSubject(index, { ...formValues, id: subject.id });
  }
};

// Actualizar una materia
const updateSubject = async (index: number, updatedSubject: Subject) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/subjects/${updatedSubject.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedSubject),
    // });
    // const updated = await response.json();

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

// Confirmar eliminación de una materia
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

// Eliminar una materia
const deleteSubject = async (index: number) => {
  const subject = subjects.value[index];
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // await fetch(`URL_API/subjects/${subject.id}`, {
    //   method: 'DELETE',
    // });

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

// Cargar materias iniciales (Leer)
const loadSubjects = async () => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/subjects');
    // const data = await response.json();
    // subjects.value = data;

    console.log("Materias cargadas:", subjects.value);
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

// Cargar datos al montar el componente
loadSubjects();
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
