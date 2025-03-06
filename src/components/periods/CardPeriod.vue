<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nuevo Periodo"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de periodos -->
    <div class="card">
      <DataTable
        :value="periods"
        scrollable
        scrollHeight="780px"
        class="mt-6"
        :loading="loading"
      >
        <Column field="nombre" header="Nombre" style="min-width: 150px" frozen class="font-bold"></Column>
        <Column field="fechaInicio" header="Fecha Inicio" style="min-width: 120px"></Column>
        <Column field="fechaFin" header="Fecha Fin" style="min-width: 120px"></Column>
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

// Interfaz para los periodos
interface Period {
  id: number;
  nombre: string;
  fechaInicio: string; // Formato: YYYY-MM-DD
  fechaFin: string; // Formato: YYYY-MM-DD
}

// Estado para los periodos
const periods = ref<Period[]>([
  {
    id: 1,
    nombre: "Semestre 1 - 2025",
    fechaInicio: "2025-01-15",
    fechaFin: "2025-06-15",
  },
  {
    id: 2,
    nombre: "Semestre 2 - 2025",
    fechaInicio: "2025-07-01",
    fechaFin: "2025-12-15",
  },
  {
    id: 3,
    nombre: "Verano 2025",
    fechaInicio: "2025-06-20",
    fechaFin: "2025-08-10",
  },
]);

const loading = ref(false);

// Abrir modal para agregar un nuevo periodo
const openCreateModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Nuevo Periodo",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <input id="swal-fechaInicio" class="swal2-input" type="date" placeholder="Fecha Inicio" />
      <input id="swal-fechaFin" class="swal2-input" type="date" placeholder="Fecha Fin" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const fechaInicio = (document.getElementById("swal-fechaInicio") as HTMLInputElement).value;
      const fechaFin = (document.getElementById("swal-fechaFin") as HTMLInputElement).value;

      if (!nombre || !fechaInicio || !fechaFin) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      if (new Date(fechaInicio) >= new Date(fechaFin)) {
        Swal.showValidationMessage("La Fecha Inicio debe ser anterior a la Fecha Fin.");
        return false;
      }
      return { nombre, fechaInicio, fechaFin };
    },
  });

  if (formValues) {
    await createPeriod(formValues);
  }
};

// Crear un nuevo periodo
const createPeriod = async (period: Omit<Period, "id">) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/periods', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(period),
    // });
    // const createdPeriod = await response.json();

    const createdPeriod = { ...period, id: periods.value.length + 1 };
    periods.value.push(createdPeriod);

    await Swal.fire({
      icon: "success",
      title: "¡Periodo creado!",
      text: `${createdPeriod.nombre} ha sido agregado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el periodo. Intenta de nuevo.",
    });
    console.error("Error al crear periodo:", error);
  } finally {
    loading.value = false;
  }
};

// Abrir modal para editar un periodo
const openEditModal = async (index: number) => {
  const period = periods.value[index];
  const { value: formValues } = await Swal.fire({
    title: "Editar Periodo",
    html: `
      <input id="swal-nombre" class="swal2-input" value="${period.nombre}" placeholder="Nombre" />
      <input id="swal-fechaInicio" class="swal2-input" type="date" value="${period.fechaInicio}" placeholder="Fecha Inicio" />
      <input id="swal-fechaFin" class="swal2-input" type="date" value="${period.fechaFin}" placeholder="Fecha Fin" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value;
      const fechaInicio = (document.getElementById("swal-fechaInicio") as HTMLInputElement).value;
      const fechaFin = (document.getElementById("swal-fechaFin") as HTMLInputElement).value;

      if (!nombre || !fechaInicio || !fechaFin) {
        Swal.showValidationMessage("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      if (new Date(fechaInicio) >= new Date(fechaFin)) {
        Swal.showValidationMessage("La Fecha Inicio debe ser anterior a la Fecha Fin.");
        return false;
      }
      return { nombre, fechaInicio, fechaFin };
    },
  });

  if (formValues) {
    await updatePeriod(index, { ...formValues, id: period.id });
  }
};

// Actualizar un periodo
const updatePeriod = async (index: number, updatedPeriod: Period) => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch(`URL_API/periods/${updatedPeriod.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedPeriod),
    // });
    // const updated = await response.json();

    periods.value[index] = updatedPeriod;

    await Swal.fire({
      icon: "success",
      title: "¡Periodo actualizado!",
      text: `${updatedPeriod.nombre} ha sido actualizado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el periodo. Intenta de nuevo.",
    });
    console.error("Error al actualizar periodo:", error);
  } finally {
    loading.value = false;
  }
};

// Confirmar eliminación de un periodo
const confirmDelete = async (index: number) => {
  const period = periods.value[index];
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Eliminarás "${period.nombre}" (${period.fechaInicio} - ${period.fechaFin}). Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    await deletePeriod(index);
  }
};

// Eliminar un periodo
const deletePeriod = async (index: number) => {
  const period = periods.value[index];
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // await fetch(`URL_API/periods/${period.id}`, {
    //   method: 'DELETE',
    // });

    periods.value.splice(index, 1);

    await Swal.fire({
      icon: "success",
      title: "¡Periodo eliminado!",
      text: `${period.nombre} ha sido eliminado exitosamente.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el periodo. Intenta de nuevo.",
    });
    console.error("Error al eliminar periodo:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar periodos iniciales (Leer)
const loadPeriods = async () => {
  try {
    loading.value = true;
    // Simulación de llamada a la API
    // const response = await fetch('URL_API/periods');
    // const data = await response.json();
    // periods.value = data;

    console.log("Periodos cargados:", periods.value);
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los periodos.",
    });
    console.error("Error al cargar periodos:", error);
  } finally {
    loading.value = false;
  }
};

// Cargar datos al montar el componente
loadPeriods();
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
