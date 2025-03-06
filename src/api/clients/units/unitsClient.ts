import { ConnectionAPI } from "@/api/connectionAPI";
import { GenericRequest } from "@/api/genericRequest";

const url = ConnectionAPI();
const base = url + "/Unidades";

export const GetUnits = async () => {
  console.log(base)
  return await GenericRequest({ url: base, method: "GET" });
};

export const PostUnits = async (values) => {
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

export const UpdateUnits = async (values) => {
  return await GenericRequest({
    url: `${base}/${values.id}`,
    method: "PUT",
    data: {
      nombre: values.nombre,
      descripcion: values.descripcion,
      esBorrado: values.esBorrado || false,
    },
  });
};

export const DeleteUnit = async (id: number) => {
  return await GenericRequest({ url: `${base}/${id}`, method: "DELETE" });
};
