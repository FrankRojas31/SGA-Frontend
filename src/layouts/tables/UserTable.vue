<script lang="ts" setup>
import { Status, type dataFilter } from '@/interfaces/UsersTypes/Users';
import type { ITable } from '../../interfaces/TablesTypes/Table';

const columns:ITable[] = [
  {key: 1, label: "Nombre de Usuario"},
  {key: 2, label: "email"},
  {key: 3, label: "Estatus"},
  {key: 4, label: "Rol"},
]
const dataUsers:dataFilter[]= [
  {id: 1, username: "Francisco Emmanuel Rojas Cerón", email:"fco3190@gmail.com", status: Status.ACTIVO, role:"Admin"}
]

</script>

<template>
  <div class="flex flex-col mt-6">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="column in columns" :key="column.key" scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {{ column.label }}
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="data in dataUsers" :key="data.id" class="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td class="px-6 py-3">
                  {{ data.username }}
                </td>
                <td class="px-6 py-3">
                  {{ data.email }}
                </td>
                <td class="px-6 py-3">
                  {{ data.status }}
                </td>
                <td v-if="data.role" class="px-6 py-3">
                  {{ data.role }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <div class="flex space-x-4">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Editar</a>
                    <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
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
