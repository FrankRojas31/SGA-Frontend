import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { IUserToken } from '@/interfaces/UsersTypes/Users'
import { useStorage } from '@vueuse/core'
import {
  LoginAccount,
  RegisterAccount,
  LogoutAccount,
  RefreshToken,
} from '@/services/auth/userServices'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const refreshToken = useStorage('refreshToken', '')
  const accessToken = useStorage('accessToken', '')
  const user = ref<IUserToken | null>(null)

  const isLogged = computed(() => !!accessToken.value && !!refreshToken.value)

  const decodedToken = computed(() => {
    if (!accessToken.value) return null
    try {
      return jwtDecode<IUserToken>(accessToken.value)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
      return null
    }
  })

  const updateUserFromToken = () => {
    user.value = decodedToken.value
  }

  watch(
    accessToken,
    () => {
      updateUserFromToken()
    },
    { immediate: true }
  )

  async function Login(email: string, password: string) {
    try {
      const response = await LoginAccount(email, password)

      if (response.status === 200) {
        accessToken.value = response.data.accessToken
        refreshToken.value = response.data.refreshToken
        updateUserFromToken()

        await Swal.fire({
          icon: 'success',
          text: '¡Has iniciado sesión correctamente!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function Register(email: string, password: string) {
    try {
      const response = await RegisterAccount(email, password)

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          text: '¡Cuenta registrada correctamente! ¡Iniciando Sesión!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

        await Login(email, password)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  async function Logout() {
    try {
      const response = await LogoutAccount(accessToken.value)

      if (response.status === 200) {
        accessToken.value = ''
        refreshToken.value = ''
        user.value = null

        await Swal.fire({
          icon: 'success',
          text: '¡Has cerrado sesión correctamente!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

        router.push('/login')
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function refreshAccessToken() {
    try {
      const response = await RefreshToken(refreshToken.value)
      if (response.status === 200) {
        accessToken.value = response.data.accessToken
        updateUserFromToken()
      } else {
        await Logout()
      }
    } catch (error) {
      console.error('Error al refrescar el token:', error)
      await Logout()
    }
  }

  return { accessToken, refreshToken, isLogged, Login, Logout, Register, refreshAccessToken, user }
})
