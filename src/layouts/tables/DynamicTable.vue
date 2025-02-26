<script lang="ts" setup>
import { defineProps } from 'vue';
import type { ITable } from '@/interfaces/TablesTypes/Table';
import Swal from 'sweetalert2';

type TableItem = Record<string, any>;

defineProps<{
  data: TableItem[];
  columns: ITable[];
  canEdit: boolean;
  canDelete: boolean;
}>();

const openEditModal = () => {
  Swal.fire({
    title: 'Editar',
    text: `¿Deseas editar el registro?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = "/ruta-de-edicion";
    }
  })
}

const openDeleteModal = () => {
  Swal.fire({
    title: 'Eliminar',
    text: `¿Estás seguro de eliminar el registro?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    dangerMode: true,
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = "/ruta-de-eliminación"
    }
  })
};

</script>

<template>
  <div class="flex flex-col mt-6">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>

                <!-- Encabezados dinámicos -->
                <th v-for="(column, index) in columns" :key="index" scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {{ column.label }}
                </th>
                <th v-show="canEdit || canDelete" scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Filas dinámicas -->
              <tr v-for="(item, rowIndex) in data" :key="rowIndex"
                class="transition-all hover:bg-gray-100 hover:shadow-lg">
                <!-- Celdas dinámicas -->
                <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-3">
                  <template v-if="column.render">
                    {{ column.render(item) }}
                  </template>
                  <template v-else>
                    {{ item[column.key] }}
                  </template>
                </td>
                <td v-if="canEdit || canDelete" class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <div class="flex space-x-4">
                    <a v-if="canEdit" href="#" @click="openEditModal" class="text-indigo-600 hover:text-indigo-900">Editar</a>
                    <a v-if="canDelete" href="#" @click="openDeleteModal" class="text-red-600 hover:text-red-900">Eliminar</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
