import axios from 'axios'
import type { Method } from 'axios'
import Swal from 'sweetalert2' // Asegúrate de importar SweetAlert2

interface RequestOptions {
  url: string
  method: Method
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
}

export async function GenericRequest({
  url,
  method,
  headers = { 'Content-Type': 'application/json' },
  params,
  data,
}: RequestOptions) {
  try {
    const response = await axios({
      url,
      method,
      headers,
      params,
      data,
    })

    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error ||
        'No se pudo conectar con la API. Por favor, intenta de nuevo.'
      await Swal.fire({
        icon: 'error',
        title: '¡Ups! Algo salió mal',
        text: errorMessage,
        confirmButtonText: 'Entendido',
      })
      throw new Error(errorMessage)
    }
    throw new Error('An unexpected error occurred')
  }
}
