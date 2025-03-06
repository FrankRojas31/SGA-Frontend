import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { IGroups } from '@/types/Groups'

const url = ConnectionAPI()
const base = url + '/Grupo'

export const GetGroups= async () => {
  return await GenericRequest({ url: base, method: 'GET' })
}

export const PostGroup = async (values: IGroups) => {
  return await GenericRequest({
    url: base,
    method: 'POST',
    data: {
      nombre: values.nombre,
      descripcion: values.descripcion,
      esBorrado: false,
    },
  })
}

export const UpdateGroup = async (values: IGroups) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: 'PUT',
    data: {
      nombre: values.nombre,
      descripcion: values.descripcion,
      esBorrado: false,
    },
  })
}

export const DeleteGroup = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: 'DELETE' })
}
