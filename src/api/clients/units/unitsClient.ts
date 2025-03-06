import { ConnectionAPI } from "@/api/connectionAPI"
import { GenericRequest } from "@/api/genericRequest"

const url = ConnectionAPI()
const base = url + '/Unidades'

export const GetUnits = async() =>{
  return await GenericRequest({ url: base, method: "GET" });
}

export const  PostUnits = async(values) => {
  return await GenericRequest({ url: base, method: "POST", data: {
    nombre: values.nombre,
    descripcion: values.descripcion,
    esBorrado: false
  }});
}
