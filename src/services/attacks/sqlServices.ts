import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { IItem, IItemSend } from '@/interfaces/attacks/items'

const urlBase = ConnectionAPI()

export const GetItemsAll = async () => {
  return await GenericRequest({ url: `${urlBase}items`, method: 'GET' })
}

export const PostItem = async (item: IItemSend) => {
  return await GenericRequest({
    url: `${urlBase}items`,
    method: 'POST',
    data: {
      name: item.name,
      description: item.description,
    },
  })
}

export const PutItem = async (item: IItem) => {
  return await GenericRequest({
    url: `${urlBase}items/${item.id}`,
    method: 'PUT',
    data: {
      name: item.name,
      description: item.description,
    },
  })
}

export const DeleteItem = async (id: number) => {
  return await GenericRequest({ url: `${urlBase}items/${id}`, method: 'DELETE' })
}

export const DeleteAllItems = async () => {
  return await GenericRequest({ url: `${urlBase}items`, method: 'DELETE' })
}
