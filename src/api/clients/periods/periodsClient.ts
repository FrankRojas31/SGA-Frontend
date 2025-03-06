import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { IPeriods } from '@/types/Periods'

const url = ConnectionAPI()
const base = url + '/Periodos'

export const GetPeriods = async () => {
  return await GenericRequest({ url: base, method: 'GET' })
}

export const PostPeriods = async (values: IPeriods) => {
  return await GenericRequest({
    url: base,
    method: 'POST',
    data: {
      nombre: values.nombre,
      esBorrado: false,
      fechaInicio: values.fechaInicio,
      fechaFin: values.fechaFin,
    },
  })
}

export const UpdatePeriod = async (values: IPeriods) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: 'PUT',
    data: {
      id: values.id,
      nombre: values.nombre,
      fechaInicio: values.fechaInicio,
      fechaFin: values.fechaFin,
      esBorrado: false,
    },
  })
}

export const DeletePeriod = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: 'DELETE' })
}
