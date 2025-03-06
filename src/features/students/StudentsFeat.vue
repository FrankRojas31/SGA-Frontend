<script lang="ts" setup>
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
  import TableStudent from '@/components/students/TableStudentComponent.vue'
</script>

<template>

<AppSidebar>
  <div class="font-semibold text-xl mb-4 mt-4 text-center">TODOS LOS ALUMNOS</div>
  <TableStudent class="px-6"/>
</AppSidebar>
</template>
