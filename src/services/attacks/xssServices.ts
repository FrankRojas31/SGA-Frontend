import { ConnectionAPI } from "@/api/connectionAPI"
import { GenericRequest } from "@/api/genericRequest"
import type { ICommentSend } from "@/interfaces/attacks/xss";

const urlBase = ConnectionAPI();

export const addComentts = async (sendData: ICommentSend) => {
  return await GenericRequest({ url: `${urlBase}attack/xss`, method: "POST",data: sendData});
}

export const GetCommentss = async () => {
  return await GenericRequest({ url: `${urlBase}attack/xss`, method: "GET"});
}
