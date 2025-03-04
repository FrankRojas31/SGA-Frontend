<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import Swal from 'sweetalert2'
  import ItemsTable from '@/layouts/tables/ItemsTable.vue'
  import type { IItem, IItemSend } from '../interfaces/attacks/items'
  import {
    DeleteAllItems,
    DeleteItem,
    GetItemsAll,
    PostItem,
    PutItem,
  } from '@/services/attacks/sqlServices'
  const items = ref<IItem[]>([])

  // CRUD COMPLETITO JIJIJI :>

  // GET: /items/
  const GetItemsBD = async () => {
    const bdItems = await GetItemsAll()
    items.value = bdItems.data
  }

  //POST: /items/ body: El item
  const PostItemBD = async (Item: IItemSend) => {
    console.log(Item)
    const result = await PostItem(Item)
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El item se ha agregado correctamente',
        timer: 1000,
        timerProgressBar: false,
      })
      await GetItemsBD()
    }
  }

  //PUT: /items/1 body: El item.
  const PutItemBD = async (Item: IItem) => {
    const result = await PutItem(Item)
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El item se ha editado correctamente',
        timer: 1000,
        timerProgressBar: false,
      })

      await GetItemsBD()
    }
  }

  //DELETE: /Delete/1 Uno por Uno.
  const DeleteItemBD = async (id: number) => {
    const result = await DeleteItem(id)
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El item se ha eliminado correctamente',
        timer: 1000,
        timerProgressBar: false,
      })
      await GetItemsBD()
    }
  }

  //DELETE: /Delete/ Mata a todos xd
  const DeleteItemsAllBD = async () => {
    const result = await DeleteAllItems()
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'Los items se ha eliminado correctamente',
        timer: 1000,
        timerProgressBar: false,
      })
      await GetItemsAll()
    }
  }

  onMounted(async () => {
    await GetItemsBD()
  })

  // FIN DEL CRUD.

  const AddItem = () => {
    Swal.fire({
      title: 'Agregar Nuevo Item',
      html: `
      <div class="w-full max-w-md mx-auto p-4">
      <div class="mb-3">
        <label class="block text-sm text-gray-700 mb-1">
          Nombre
        </label>
        <input
          id="swal-name"
          class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Carton ML">
      </div>

      <div class="mb-3">
        <label class="block text-sm text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="swal-description"
          class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Descripción"></textarea>
      </div>
    </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value
        const description = (document.getElementById('swal-description') as HTMLTextAreaElement)
          .value

        if (!name || !description) {
          Swal.showValidationMessage('Por favor completa todos los campos')
          return false
        }

        return { name, description }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const item: IItemSend = {
          name: result.value.name,
          description: result.value.description,
        }
        await PostItemBD(item)
      }
    })
  }

  const EditItem = (item: IItem) => {
    Swal.fire({
      title: 'Editar Item',
      html: `
      <div class="w-full max-w-md mx-auto p-4">
      <div class="mb-3">
        <label class="block text-sm text-gray-700 mb-1">
          Nombre
        </label>
        <input
          id="swal-name"
          class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Carton ML"
          value="${item.name}">
      </div>

      <div class="mb-3">
        <label class="block text-sm text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="swal-description"
          class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Descripción">${item.description}</textarea>
      </div>
    </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value
        const description = (document.getElementById('swal-description') as HTMLTextAreaElement)
          .value

        if (!name || !description) {
          Swal.showValidationMessage('Por favor completa todos los campos')
          return false
        }

        return { name, description }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendItem: IItem = {
          id: item.id,
          name: result.value.name,
          description: result.value.description,
        }

        await PutItemBD(sendItem)
      }
    })
  }

  const DeleteItemModal = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteItemBD(id)
      }
    })
  }

  const DeleteItemsAll = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteItemsAllBD()
      }
    })
  }
</script>

<template>
  <div class="flex mt-6 justify-end">
    <button
      @click="AddItem"
      class="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Agregar
    </button>
    <button
      @click="DeleteItemsAll"
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Eliminar Todos
    </button>
  </div>
  <ItemsTable class="mt-2" :items="items" @edit-item="EditItem" @delete-item="DeleteItemModal" />
</template>
