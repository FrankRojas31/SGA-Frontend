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
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                label="Editar"
                severity="secondary"
                outlined
                class="text-xs py-1"
                @click="openEditModal(data)"
              />
              <Button
                label="Eliminar"
                severity="danger"
                outlined
                class="text-xs py-1"
                @click="confirmDelete(data)"
              />
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
import { GetPeriods, PostPeriods, UpdatePeriod, DeletePeriod } from "@/api/clients/periods/periodsClient";
import type { IPeriods } from "@/types/Periods";


const periods = ref<IPeriods[]>([]);
const loading = ref(false);


const loadPeriods = async () => {
  try {
    loading.value = true;
    const response = await GetPeriods();
    periods.value = response.data.data;
  } catch (error) {
    await Swal.fire("Error", "No se pudieron cargar los periodos.", "error");
    console.error("Error al cargar periodos:", error);
  } finally {
    loading.value = false;
  }
};

const createPeriod = async (period: Omit<IPeriods, "id">) => {
  try {
    loading.value = true;
    await PostPeriods(period);
    await Swal.fire("Éxito", "Periodo creado correctamente.", "success");
    await loadPeriods();
  } catch (error) {
    await Swal.fire("Error", "No se pudo crear el periodo.", "error");
    console.error("Error al crear periodo:", error);
  } finally {
    loading.value = false;
  }
};

// Actualizar un periodo
const updatePeriod = async (period: IPeriods) => {
  try {
    loading.value = true;
    await UpdatePeriod(period);
    await Swal.fire("Éxito", "Periodo actualizado correctamente.", "success");
    await loadPeriods();
  } catch (error) {
    await Swal.fire("Error", "No se pudo actualizar el periodo.", "error");
    console.error("Error al actualizar periodo:", error);
  } finally {
    loading.value = false;
  }
};

// Eliminar un periodo
const deletePeriod = async (id: number) => {
  try {
    loading.value = true;
    await DeletePeriod(id);
    await Swal.fire("Éxito", "Periodo eliminado correctamente.", "success");
    await loadPeriods();
  } catch (error) {
    await Swal.fire("Error", "No se pudo eliminar el periodo.", "error");
    console.error("Error al eliminar periodo:", error);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async (period: IPeriods) => {
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
    await deletePeriod(period.id);
  }
};

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
        Swal.showValidationMessage("Por favor, completa todos los campos.");
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


const openEditModal = async (period: IPeriods) => {
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
        Swal.showValidationMessage("Por favor, completa todos los campos.");
        return false;
      }
      if (new Date(fechaInicio) >= new Date(fechaFin)) {
        Swal.showValidationMessage("La Fecha Inicio debe ser anterior a la Fecha Fin.");
        return false;
      }
      return { id: period.id, nombre, fechaInicio, fechaFin };
    },
  });

  if (formValues) {
    await updatePeriod(formValues);
  }
};


onMounted(loadPeriods);
</script>
