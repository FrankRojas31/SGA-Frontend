<script lang="ts" setup>
  import TableGroup from '@/components/groups/TableGroupComponent.vue'
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
</script>

<template>
  <AppSidebar>
    <div class="font-semibold text-xl mb-4 text-center mt-4">GRUPOS</div>
    <TableGroup class="px-6" />
  </AppSidebar>
</template>
