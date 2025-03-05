<template>
    <div class="bg-surface-0 dark:bg-surface-950 p-10 md:p-20">
        <div class="bg-surface-0 dark:bg-surface-950">
            <div class="font-medium text-3xl text-surface-900 dark:text-surface-0 mb-4">Movie Information</div>
            <div class="text-surface-500 dark:text-surface-300 mb-8">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
            <ul class="list-none p-0 m-0">
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
                    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">Title</div>
                    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1">Heat</div>
                    <div class="w-6/12 md:w-2/12 flex justify-end">
                        <Button label="Edit" icon="pi pi-pencil" text />
                    </div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
                    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">Genre</div>
                    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1">
                        <Chip label="Crime" class="mr-2" />
                        <Chip label="Drama" class="mr-2" />
                        <Chip label="Thriller" />
                    </div>
                    <div class="w-6/12 md:w-2/12 flex justify-end">
                        <Button label="Edit" icon="pi pi-pencil" text />
                    </div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
                    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">Director</div>
                    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1">Michael Mann</div>
                    <div class="w-6/12 md:w-2/12 flex justify-end">
                        <Button label="Edit" icon="pi pi-pencil" text />
                    </div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
                    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">Actors</div>
                    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1">Robert De Niro, Al Pacino</div>
                    <div class="w-6/12 md:w-2/12 flex justify-end">
                        <Button label="Edit" icon="pi pi-pencil" text />
                    </div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-b border-surface flex-wrap">
                    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">Plot</div>
                    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1 leading-normal">
                        A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.
                    </div>
                    <div class="w-6/12 md:w-2/12 flex justify-end">
                        <Button label="Edit" icon="pi pi-pencil" text />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import Chip from 'primevue/chip';
</script>
