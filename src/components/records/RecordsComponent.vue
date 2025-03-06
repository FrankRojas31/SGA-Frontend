<script lang="ts" setup>
  import { ref } from 'vue'

  const students = ref([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      status: 'Aprobado',
      grade: '10',
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria.lopez@example.com',
      status: 'Aprobado',
      grade: '9',
    },
    {
      id: 3,
      name: 'Carlos Gómez',
      email: 'carlos.gomez@example.com',
      status: 'Reprobado',
      grade: '5',
    },
    {
      id: 4,
      name: 'Ana Hernández',
      email: 'ana.hernandez@example.com',
      status: 'Aprobado',
      grade: '8',
    },
  ])

  // Función para simular la generación de una constancia
  const generateCertificate = (studentId) => {
    console.log(`Generando constancia para el alumno con ID: ${studentId}`)
    // Aquí puedes integrar la lógica para generar la constancia en PDF o algún otro formato
  }
</script>

<template>
  <div class="p-6">
    <h2 class="font-semibold text-3xl mb-6 text-gray-800">Generación de Constancias</h2>

    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full">
        <thead class="bg-gray-200">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Calificación
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Estado
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="student in students"
            :key="student.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 text-sm text-gray-800">{{ student.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ student.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ student.grade }}</td>
            <td class="px-6 py-4 text-sm">
              <span
                :class="{
                  'text-green-600 font-semibold': student.status === 'Aprobado',
                  'text-red-600 font-semibold': student.status === 'Reprobado',
                }"
              >
                {{ student.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm">
              <button
                v-if="student.status === 'Aprobado'"
                @click="generateCertificate(student.id)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generar Constancia
              </button>
              <span v-else class="text-red-600">No Aprobado</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  /* Personaliza los estilos de la tabla si es necesario */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #e2e8f0;
    padding: 8px;
  }
</style>
