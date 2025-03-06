<script lang="ts" setup>
  import CardsComponent from '@/components/dashboard/CardsComponent.vue'
  import ChartComponent from '@/components/dashboard/ChartComponent.vue'
  import TableComponent from '@/components/dashboard/TableComponent.vue'
  import AppSidebar from '@/layouts/navigation/AppSidebar.vue'
  import PanelComponent from '@/components/dashboard/PanelComponent.vue'
  import { onMounted, ref } from 'vue'
  import { GetStudents } from '@/api/clients/students/studentsClient'
  import type { IUser } from '@/types/Users'
  import type { ResponseHelper } from '@/types/ResponseHelper'
  import type { IEstudiante } from '@/types/Students'
  import { GetTeachers } from '@/api/clients/teachers/teachersClient'
  import type { ITeacher } from '@/types/Teachers'
  import { GetGroups } from '@/api/clients/groups/groupsClient'
  import type { IGroups } from '@/types/Groups'
  import { GetSubject } from '@/api/clients/subjects/subjectClient'

  const countStudents = ref(0)
  const countTeachers = ref(0)
  const countGroups = ref(0)
  const countSubjects = ref(0)

  const GetCountUsers = async () => {
    const response = await GetStudents()
    const responsehelper = response.data as ResponseHelper<IEstudiante[]>
    countStudents.value = responsehelper.data!.length
  }

  const GetCountTeachers = async () => {
    const response = await GetTeachers()
    const responsehelper = response.data as ResponseHelper<ITeacher[]>
    countTeachers.value = responsehelper.data!.length
  }

  const GetCountGroups = async () => {
    const response = await GetGroups()
    const responsehelper = response.data as ResponseHelper<IGroups[]>
    countGroups.value = responsehelper.data!.length
  }

  const GetCountSubjects = async () => {
    const response = await GetSubject()
    const responsehelper = response.data as ResponseHelper<IGroups[]>
    countSubjects.value = responsehelper.data!.length
  }

  const items = [
    {
      title: 'Total de Alumnos',
      count: countStudents,
      new: `${countStudents.value} nuevos`,
      icon: 'pi pi-users',
    },
    {
      title: 'Total de Profesores',
      count: countTeachers,
      new: `${countTeachers.value} nuevos`,
      icon: 'pi pi-user',
    },
    {
      title: 'Total de Grupos',
      count: countGroups,
      new: `${countGroups.value} nuevos`,
      icon: 'pi pi-sitemap',
    },
    {
      title: 'Total de Materias',
      count: countSubjects,
      new: `${countSubjects.value} nuevos`,
      icon: 'pi pi-book',
    },
  ]

  onMounted(async () => {
    await GetCountUsers()
    await GetCountTeachers()
    await GetCountGroups()
    await GetCountSubjects()
  })
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
    <!-- <div class="px-6 py-5 flex flex-col md:flex-row gap-4"> -->
    <!-- Sección Informativa -->
    <!-- <div class="bg-white opacity-100 p-6 shadow rounded-md flex-1">
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
      </div> -->

    <!-- Sección Informativa -->
    <!-- <div class="bg-white opacity-100 p-6 shadow rounded-md flex-1">
        <div class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-4">
          Alumnos Reprobados
        </div>
        <div class="text-gray-700">
          <TableComponent />
        </div>
      </div>
      </div> -->

    <div class="px-6 py-4">
      <PanelComponent />
    </div>
  </AppSidebar>
</template>
