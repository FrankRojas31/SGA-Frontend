import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { IEstudiante } from '@/types/Students'

const url = ConnectionAPI()
const base = url + '/Alumnos'

export const GetStudents = async () => {
  return await GenericRequest({ url: base, method: 'GET' })
}

export const PostStudent = async (values: IEstudiante) => {
  return await GenericRequest({
    url: base,
    method: 'POST',
    data: {
      nombres: values.nombres,
      apellido_Materno: values.apellido_Materno,
      apellido_Paterno: values.apellido_Paterno,
      matricula: values.matricula,
      idPersona: values.idPersona,
      esBorrado: false,
    },
  })
}

export const UpdateStudent = async (values: IEstudiante) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: 'PUT',
    data: {
      nombres: values.nombres,
      apellido_Materno: values.apellido_Materno,
      apellido_Paterno: values.apellido_Paterno,
      matricula: values.matricula,
      idPersona: values.idPersona,
      esBorrado: false,
    },
  })
}

export const DeleteStudent = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: 'DELETE' })
}
