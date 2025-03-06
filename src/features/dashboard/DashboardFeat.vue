<script lang="ts" setup>
  import CardsComponent from '@/components/dashboard/CardsComponent.vue'
  import ChartComponent from '@/components/dashboard/ChartComponent.vue'
  import TableComponent from '@/components/dashboard/TableComponent.vue'
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
  import PanelComponent from '@/components/dashboard/PanelComponent.vue'
</script>

<template>
  <AppSidebar>
    <!-- Sección de Bienvenida -->
    <div class="px-6 py-4">
      <div class="bg-white opacity-100 p-6 shadow rounded-md text-center md:text-left">
        <div class="text-2xl md:text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">
          ¡Bienvenido al Panel de Control!
        </div>
        <div class="text-gray-700">
          Le damos la más cordial bienvenida. Nuestro objetivo es ofrecerle una experiencia
          eficiente y estructurada para la gestión de sus actividades.
        </div>
      </div>
    </div>

    <CardsComponent />

    <!-- Sección Informativa y Gráfica -->
    <div class="px-6 py-5 flex flex-col md:flex-row gap-4">
      <!-- Sección Informativa -->
      <div class="bg-white opacity-100 p-6 shadow rounded-md flex-1">
        <div class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-4">
          Alumnos Aprobados
        </div>
        <div class="text-gray-700">
          <TableComponent />
        </div>
      </div>

      <div class="bg-white px-6 shadow rounded-md w-full md:w-[550px]">
        <p class="text-center font-bold mt-3">Alumnos Aprobados</p>
        <ChartComponent class="pb-4" />
      </div>
    </div>

    <div class="px-6 flex flex-col md:flex-row gap-4">
      <div class="bg-white px-6 shadow rounded-md w-full md:w-[550px]">
        <p class="text-center font-bold mt-3">Alumnos Reprobados</p>
        <ChartComponent class="pb-4" />
      </div>

      <!-- Sección Informativa -->
      <div class="bg-white opacity-100 p-6 shadow rounded-md flex-1">
        <div class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-4">Alumnos Reprobados</div>
        <div class="text-gray-700">
          <TableComponent />
        </div>
      </div>
    </div>

    <div class="px-6 py-4">
      <PanelComponent />
    </div>
  </AppSidebar>
</template>
