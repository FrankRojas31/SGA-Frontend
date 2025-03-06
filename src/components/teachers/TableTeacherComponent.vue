<template>
  <div class="p-4">
    <!-- Botón para abrir el modal de agregar -->
    <div class="mb-6">
      <Button
        label="Agregar Nuevo Profesor"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <!-- Tabla de profesores -->
    <div class="card">
      <DataTable :value="teachers" scrollable scrollHeight="780px" class="mt-6" :loading="loading">
        <Column
          field="nombres"
          header="Nombre"
          style="min-width: 120px"
          frozen
          class="font-bold"
        ></Column>
        <Column
          field="apellido_Paterno"
          header="Apellido Paterno"
          style="min-width: 120px"
        ></Column>
        <Column field="apellido_Materno" header="Apellido Materno" style="min-width: 120px"></Column>
        <Column field="especialidad" header="Especialidad" style="min-width: 150px"></Column>
        <Column field="grado" header="Grado" style="min-width: 120px"></Column>
        <Column field="cedula" header="Cédula" style="min-width: 120px"></Column>
        <Column header="Acciones" style="min-width: 150px">
          <template #body="{ index }">
            <div class="flex gap-2">
              <Button
                label="Editar"
                severity="secondary"
                outlined
                class="text-xs py-1"
                @click="openEditModal(index)"
              />
              <Button
                v-if="authStore.user?.role != 'Admin'"
                label="Eliminar"
                severity="danger"
                outlined
                class="text-xs py-1"
                @click="confirmDelete(index)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import Swal from 'sweetalert2'
  import {
    GetTeachers,
    PostTeacher,
    UpdateTeacher,
    DeleteTeacher,
  } from '@/api/clients/teachers/teachersClient'
  import type { ITeacher } from '@/types/Teachers'
  import { useAuthStore } from '@/stores/AuthStore'

  const teachers = ref<ITeacher[]>([])
  const authStore = useAuthStore()

  const loading = ref(false)

  const loadTeachers = async () => {
    try {
      loading.value = true
      const response = await GetTeachers()
      teachers.value = response.data.data
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los profesores.',
      })
      console.error('Error al cargar profesores:', error)
    } finally {
      loading.value = false
    }
  }

  const openCreateModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nuevo Profesor',
      html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" placeholder="Apellido Materno" />
      <input id="swal-especialidad" class="swal2-input" placeholder="Especialidad" />
      <input id="swal-grado" class="swal2-input" placeholder="Grado" />
      <input id="swal-cedula" class="swal2-input" placeholder="Cédula" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value
        const apellidoPaterno = (
          document.getElementById('swal-apellidoPaterno') as HTMLInputElement
        ).value
        const apellidoMaterno = (
          document.getElementById('swal-apellidoMaterno') as HTMLInputElement
        ).value
        const especialidad = (document.getElementById('swal-especialidad') as HTMLInputElement)
          .value
        const grado = (document.getElementById('swal-grado') as HTMLInputElement).value
        const cedula = (document.getElementById('swal-cedula') as HTMLInputElement).value

        if (!nombre || !apellidoPaterno || !apellidoMaterno || !especialidad || !grado || !cedula) {
          Swal.showValidationMessage('Por favor, completa todos los campos obligatorios.')
          return false
        }
        return { nombre, apellidoPaterno, apellidoMaterno, especialidad, grado, cedula }
      },
    })

    if (formValues) {
      await createTeacher(formValues)
    }
  }

  const createTeacher = async (teacher: ITeacher) => {
    try {
      loading.value = true
      const response = await PostTeacher(teacher)
      teachers.value.push(response.data.data)

      await Swal.fire({
        icon: 'success',
        title: '¡Profesor creado!',
        text: `${response.data.nombre} ${response.data.apellidoPaterno} ha sido agregado exitosamente.`,
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el profesor. Intenta de nuevo.',
      })
      console.error('Error al crear profesor:', error)
    } finally {
      loading.value = false
    }
  }

  const openEditModal = async (index: number) => {
    const teacher = teachers.value[index]
    const { value: formValues } = await Swal.fire({
      title: 'Editar Profesor',
      html: `
      <input id="swal-nombre" class="swal2-input" value="${teacher.nombres}" placeholder="Nombre" />
      <input id="swal-apellidoPaterno" class="swal2-input" value="${teacher.apellido_Paterno}" placeholder="Apellido Paterno" />
      <input id="swal-apellidoMaterno" class="swal2-input" value="${teacher.apellido_Materno}" placeholder="Apellido Materno" />
      <input id="swal-especialidad" class="swal2-input" value="${teacher.especialidad}" placeholder="Especialidad" />
      <input id="swal-grado" class="swal2-input" value="${teacher.grado}" placeholder="Grado" />
      <input id="swal-cedula" class="swal2-input" value="${teacher.cedula}" placeholder="Cédula" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value
        const apellidoPaterno = (
          document.getElementById('swal-apellidoPaterno') as HTMLInputElement
        ).value
        const apellidoMaterno = (
          document.getElementById('swal-apellidoMaterno') as HTMLInputElement
        ).value
        const especialidad = (document.getElementById('swal-especialidad') as HTMLInputElement)
          .value
        const grado = (document.getElementById('swal-grado') as HTMLInputElement).value
        const cedula = (document.getElementById('swal-cedula') as HTMLInputElement).value

        if (!nombre || !apellidoPaterno || !apellidoMaterno || !especialidad || !grado || !cedula) {
          Swal.showValidationMessage('Por favor, completa todos los campos obligatorios.')
          return false
        }
        return { nombre, apellidoPaterno, apellidoMaterno, especialidad, grado, cedula }
      },
    })

    if (formValues) {
      await updateTeacher(index, { ...formValues, id: teacher.id })
    }
  }

  const updateTeacher = async (index: number, updatedTeacher: ITeacher) => {
    try {
      loading.value = true
      const response = await UpdateTeacher(updatedTeacher)
      teachers.value[index] = response.data.data

      await Swal.fire({
        icon: 'success',
        title: '¡Profesor actualizado!',
        text: `${response.data.nombre} ${response.data.apellidoPaterno} ha sido actualizado exitosamente.`,
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el profesor. Intenta de nuevo.',
      })
      console.error('Error al actualizar profesor:', error)
    } finally {
      loading.value = false
    }
  }

  const confirmDelete = async (index: number) => {
    const teacher = teachers.value[index]
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: `Eliminarás a ${teacher.nombres} ${teacher.apellido_Paterno}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      await deleteTeacher(index)
    }
  }

  const deleteTeacher = async (index: number) => {
    const teacher = teachers.value[index]
    try {
      loading.value = true
      await DeleteTeacher(teacher.id)
      teachers.value.splice(index, 1)

      await Swal.fire({
        icon: 'success',
        title: '¡Profesor eliminado!',
        text: `${teacher.nombres} ${teacher.apellido_Paterno} ha sido eliminado exitosamente.`,
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el profesor. Intenta de nuevo.',
      })
      console.error('Error al eliminar profesor:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await loadTeachers()
  })
</script>
