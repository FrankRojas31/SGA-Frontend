import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { ISubject } from '@/types/Subjects'

const url = ConnectionAPI()
const base = url + '/Materias'

export const GetSubject = async () => {
  return await GenericRequest({ url: base, method: 'GET' })
}

export const PostSubject = async (values: ISubject) => {
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

export const UpdateSubject = async (values: ISubject) => {
  return await GenericRequest({
      url: `${base}/${values.id}`,
      method: 'PUT',
      data: {
        id: values.id,
        nombre: values.nombre,
        descripcion: values.descripcion,
        esBorrado: false,
      },
    })
}

export const DeleteSubject = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: 'DELETE' })
}
