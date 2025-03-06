<script lang="ts" setup>
  import CardsComponent from '@/components/dashboard/CardsComponent.vue'
  import ChartComponent from '@/components/dashboard/ChartComponent.vue'
  import TableComponent from '@/components/dashboard/TableComponent.vue'
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
  import PanelComponent from '@/components/dashboard/PanelComponent.vue'

  
  const items = [
    { title: 'Total de Alumnos', count: 150, new: '10', icon: 'pi pi-users' },
    { title: 'Total de Profesores', count: 30, new: '2', icon: 'pi pi-user' },
    { title: 'Total de Grupos', count: 10, new: '1', icon: 'pi pi-sitemap' },
    { title: 'Total de Cursos', count: 25, new: '3', icon: 'pi pi-book' },
  ]
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

    <div class="bg-surface-50 dark:bg-surface-950 px-6">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-span-12 md:col-span-6 lg:col-span-3"
        >
          <CardsComponent
            :title="item.title"
            :count="item.count"
            :new="item.new"
            :icon="item.icon"
          />
        </div>
      </div>
    </div>

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
        <div class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-4">
          Alumnos Reprobados
        </div>
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
