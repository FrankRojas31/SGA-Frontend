<script lang="ts" setup>
import type { IItem } from '@/interfaces/attacks/items';
import type { ITable } from '../../interfaces/TablesTypes/Table'

defineProps<{
  items:IItem[]
}>()

defineEmits<{
  (e: 'edit-item', item:IItem): void
  (e: 'delete-item', id: number): void
}>()

const columns: ITable[] = [
  { key: 1, label: 'ID' },
  { key: 2, label: 'Nombre' },
  { key: 3, label: 'Descripción' },
]
</script>

<template>
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
        <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                {{ column.label }}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in items"
              :key="item.id"
              class="transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              <td class="px-6 py-3">{{ item.id }}</td>
              <td class="px-6 py-3">{{ item.name }}</td>
              <td class="px-6 py-3">{{ item.description }}</td>
              <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <div class="flex space-x-4">
                  <a
                    href="#"
                    @click.prevent="$emit('edit-item', item)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </a>
                  <a
                    href="#"
                    @click.prevent="$emit('delete-item', item.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
