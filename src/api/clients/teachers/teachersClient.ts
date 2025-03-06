import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { ITeacher } from '../../../types/Teachers'

const url = ConnectionAPI()
const base = url + '/Profesor'

export const GetTeachers = async () => {
  return await GenericRequest({ url: base, method: 'GET' })
}

export const PostTeacher = async (values: ITeacher) => {
  return await GenericRequest({
    url: base,
    method: 'POST',
    data: {
      nombres: values.nombres,
      apellido_Materno: values.apellido_Materno,
      apellido_Paterno: values.apellido_Paterno,
      cedula: values.cedula,
      especialidad: values.especialidad,
      grado: values.grado,
      noEmpleado: values.noEmpleado,
      idPersona: values.idPersona,
      esBorrado: false,
    },
  })
}

export const UpdateTeacher = async (values: ITeacher) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: 'PUT',
    data: {
      nombres: values.nombres,
      apellido_Materno: values.apellido_Materno,
      apellido_Paterno: values.apellido_Paterno,
      cedula: values.cedula,
      especialidad: values.especialidad,
      grado: values.grado,
      noEmpleado: values.noEmpleado,
      idPersona: values.idPersona,
      esBorrado: false,
    },
  })
}

export const DeleteTeacher = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: 'DELETE' })
}
