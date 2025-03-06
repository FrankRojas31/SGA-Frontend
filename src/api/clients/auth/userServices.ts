import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'
import type { ILoginUser, IUser } from '@/types/Users'

const urlBase = ConnectionAPI()

export const LoginAccount = async (values: ILoginUser) => {
  return await GenericRequest({
    url: `${urlBase}/Account/login`,
    method: 'POST',
    data: {
      email: values.email,
      password: values.password,
    },
  })
}

export const RegisterAccount = async (values: IUser) => {
  return await GenericRequest({
    url: `${urlBase}/Account/register`,
    method: 'POST',
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      estatusUsuario: values.estatusUsuario,
      rol: values.rol,
    },
  })
}

export const LogoutAccount = async (token: string) => {
  return await GenericRequest({
    url: `${urlBase}users/logout`,
    method: 'POST',
    data: {
      token: token,
    },
  })
}
