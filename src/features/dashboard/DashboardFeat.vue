<script lang='ts' setup>
import CardsComponent from '@/components/dashboard/CardsComponent.vue';
import ChartComponent from '@/components/dashboard/ChartComponent.vue';
import PanelComponent from '@/components/dashboard/PanelComponent.vue';
import TableComponent from '@/components/dashboard/TableComponent.vue';
import AppSidebar from '@/layouts/navigation/AppSidebar.vue';
</script>

<template>
  <AppSidebar>
    <div class="p-6 mb-[-30px]">
        <div class="bg-white opacity-100 p-6 shadow rounded-md">
    <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-4">¡Bienvenido al Panel de Control!</div>
    <div class="font mb-4">Le damos la más cordial bienvenida. Nuestro objetivo es ofrecerle una experiencia eficiente y estructurada para la gestión de sus actividades.</div>
</div>
    </div>
    <CardsComponent/>
    <ChartComponent/>
    <TableComponent/>
  </AppSidebar>
</template>
