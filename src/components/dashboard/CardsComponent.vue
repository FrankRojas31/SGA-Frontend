<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8">
        <div class="grid grid-cols-12 gap-4">
            <div v-for="x in 4" :key="x" class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="bg-white shadow p-4 rounded-md">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Usuarios</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-400/30 rounded-md w-10 h-10">
                            <i class="pi pi-users text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+24 Usuarios Nuevos</span>
                </div>
              </div>
        </div>
    </div>
</template>
