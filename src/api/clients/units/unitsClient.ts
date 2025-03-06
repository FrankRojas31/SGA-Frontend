import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { IUnits } from '@/types/Units'

const url = ConnectionAPI();
const base = url + "/Unidades";

export const GetUnits = async () => {
  console.log(base)
  return await GenericRequest({ url: base, method: "GET" });
};

export const PostUnit = async (values: IUnits) => {
  return await GenericRequest({
    url: base,
    method: "POST",
    data: {
      nombre: values.nombre,
      descripcion: values.descripcion,
      esBorrado: false,
    },
  });
};

export const UpdateUnit = async (values: IUnits) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: 'PUT',
    data: {
      id: values.id,
      nombre: values.nombre,
      descripcion: values.descripcion,
      esBorrado: false,
    },
  });
};

export const DeleteUnit = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: "DELETE" });
};
