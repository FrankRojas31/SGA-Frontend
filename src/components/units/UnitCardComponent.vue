<template>
  <div class="p-4">
    <div class="mb-6">
      <Button
        label="Agregar Nueva Unidad"
        class="w-full sm:w-auto text-sm py-2"
        @click="openCreateModal"
      />
    </div>

    <div class="flex flex-wrap gap-4 justify-center">
      <Card
        v-for="(card, index) in cards"
        :key="card.id"
        class="w-full sm:w-72 md:w-64 lg:w-60 overflow-hidden shadow-md"
      >
        <template #title>
          <span v-if="!card.isEditing">{{ card.nombre }}</span>
          <input v-else v-model="card.nombre" class="w-full p-1 border rounded text-sm" />
        </template>
        <template #subtitle>
          <span v-if="!card.isEditing">{{ card.descripcion }}</span>
          <input v-else v-model="card.descripcion" class="w-full p-1 border rounded text-sm" />
        </template>
        <template #footer>
          <div class="flex gap-2 mt-2">
            <Button
              v-if="!card.isEditing"
              label="Editar"
              severity="secondary"
              outlined
              class="w-full text-xs py-1"
              @click="editCard(index)"
            />
            <Button
              v-if="card.isEditing"
              label="Guardar"
              class="w-full text-xs py-1"
              @click="updateCard(index)"
            />
            <Button
              label="Eliminar"
              severity="danger"
              outlined
              class="w-full text-xs py-1"
              @click="confirmDelete(index)"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import Swal from 'sweetalert2'
  import { GetUnits, PostUnit, UpdateUnit, DeleteUnit } from '@/api/clients/units/unitsClient'
  import type { ResponseHelper } from '@/types/ResponseHelper'
  import type { IUnits } from '@/types/Units'

  const cards = ref<IUnits[]>([])

  const loadUnits = async () => {
    try {
      const response = await GetUnits()
      const unitCast = response.data as ResponseHelper<IUnits[]>
      if (response.status === 200 && unitCast) {
        cards.value = unitCast.data!
      } else {
        console.error('Formato de respuesta inesperado:', response)
      }
    } catch (error) {
      console.error('Error al cargar unidades:', error)
    }
  }

  const openCreateModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nueva Unidad',
      html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
      <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value
        const descripcion = (document.getElementById('swal-descripcion') as HTMLTextAreaElement)
          .value
        if (!nombre || !descripcion) {
          Swal.showValidationMessage('Completa todos los campos.')
          return false
        }
        return { nombre, descripcion }
      },
    })

    if (formValues) {
      await createUnit(formValues)
    }
  }

  const createUnit = async (unit: IUnits) => {
    try {
      const newUnit = await PostUnit(unit)
      const unitCast = newUnit.data as ResponseHelper<IUnits>
      await loadUnits()
      Swal.fire('¡Unidad creada!', `${unitCast.data?.nombre} ha sido agregada.`, 'success')
    } catch (error) {
      Swal.fire('Error', 'No se pudo crear la unidad.', 'error')
    }
  }

  const editCard = (index: number) => {
    cards.value[index].isEditing = true
  }

  const updateCard = async (index: number) => {
    const unitToUpdate = cards.value[index]
    try {
      await UpdateUnit(unitToUpdate)
      unitToUpdate.isEditing = false

      Swal.fire('¡Unidad actualizada!', 'Los cambios han sido guardados.', 'success')
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la unidad.', 'error')
    }
  }

  const confirmDelete = async (index: number) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar unidad?',
      text: `Eliminarás "${cards.value[index].nombre}". Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })

    if (result.isConfirmed) {
      await deleteCard(index)
    }
  }

  const deleteCard = async (index: number) => {
    const unitId = cards.value[index].id
    try {
      await DeleteUnit(unitId)
      await loadUnits()
      Swal.fire('¡Unidad eliminada!', 'Se ha eliminado correctamente.', 'success')
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la unidad.', 'error')
    }
  }

  onMounted(async () => {
    await loadUnits()
  })
</script>
