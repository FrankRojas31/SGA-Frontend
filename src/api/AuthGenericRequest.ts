import { useAuthStore } from '@/stores/AuthStore'
import axios from 'axios'
import type { Method } from 'axios'
import Swal from 'sweetalert2'

interface RequestOptions {
  url: string
  method: Method
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  requireAuth?: boolean // Indica si la petición requiere autenticación
}

export async function GenericRequestAuth({
  url,
  method,
  headers = { 'Content-Type': 'application/json' },
  params,
  data,
}: RequestOptions) {
  const auth = useAuthStore()

  try {
    headers = { ...headers, Authorization: `Bearer ${auth.accessToken}` }

    const response = await axios({ url, method, headers, params, data })
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || 'No se pudo conectar con la API. Intenta de nuevo.'

      if (error.response?.status === 401) {
        try {
          await auth.refreshAccessToken()
          return await axios({
            url,
            method,
            headers: { ...headers, Authorization: `Bearer ${auth.accessToken}` },
            params,
            data,
          })
        } catch (refreshError) {
          await Swal.fire({
            icon: 'error',
            title: 'Sesión expirada',
            text: 'No se pudo renovar tu sesión. Por favor, inicia sesión de nuevo.',
            confirmButtonText: 'Entendido',
          })
          await auth.Logout()
          throw new Error('Sesión expirada')
        }
      }

      await Swal.fire({
        icon: 'error',
        title: '¡Ups! Algo salió mal',
        text: errorMessage,
        confirmButtonText: 'Entendido',
      })

      throw new Error(errorMessage)
    }

    throw new Error('Error inesperado en la petición')
  }
}
