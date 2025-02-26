import axios from "axios";
import type { Method } from "axios";

interface RequestOptions {
  url: string;
  method: Method;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export async function GenericRequest({url, method, headers = { "Content-Type": "application/json" }, params, data, }:
  RequestOptions){
    try {
      const response = await axios({
        url,
        method,
        headers,
        params,
        data,
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error("An unexpected error occurred");
    }
}
