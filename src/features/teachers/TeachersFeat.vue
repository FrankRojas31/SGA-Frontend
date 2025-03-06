<script lang="ts" setup>
  import TableTeacherComponent from '@/components/teachers/TableTeacherComponent.vue';
import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
</script>

<template>

<AppSidebar>
  <div class="font-semibold text-xl mb-4 mt-4 text-center">PROFESORES</div>
  <TableTeacherComponent class="px-6"/>
</AppSidebar>
</template>
