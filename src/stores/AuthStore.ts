import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { LoginAccount, LogoutAccount, RegisterAccount } from '../api/clients/auth/userServices'
import { EstatusUsuario, Rol, type ILoginUser, type IUser, type IUserSend } from '@/types/Users'
import Swal from 'sweetalert2'
import type { ResponseHelper } from '@/types/ResponseHelper'
import { useStorage } from '@vueuse/core'
import type { IUserStorage } from '@/types/Users'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = useStorage<IUserStorage | null>('usuario', null, undefined, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    },
  })

  const Register = async (values: IUserSend) => {
    try {
      const send: IUser = {
        name: values.nombre,
        email: values.email,
        password: values.password,
        confirmPassword: values.duoPassword,
        estatusUsuario: EstatusUsuario.ACTIVO,
        rol: Rol.ALUMNO,
      }

      const response = await RegisterAccount(send)

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: '¡Usuario registrado! Pide a un administrador que te enrole.',
        })
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: '¡Error al registrarse!',
        text: 'Ocurrió un problema, intenta de nuevo más tarde.',
      })
    }
  }

  const Login = async (values: ILoginUser) => {
    try {
      const response = await LoginAccount(values)
      const responseHelper = response.data as ResponseHelper<IUserStorage>

      if (responseHelper.success && responseHelper.data) {
        await Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Iniciando sesión... Un momento.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })

        user.value = responseHelper.data
        router.push('/dashboard')
      } else {
        throw new Error(responseHelper.message || 'Error desconocido')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: '¡Error de autenticación!',
        text: error instanceof Error ? error.message : 'No se pudo iniciar sesión.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    }
  }

  const Logout = async () => {
    user.value = null;

    router.push("/login");
  }

  return { Register, Login, user }
})
