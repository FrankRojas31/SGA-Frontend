import { GenericRequestAuth } from '@/api/AuthGenericRequest'
import { ConnectionAPI } from '@/api/connectionAPI'
import { GenericRequest } from '@/api/genericRequest'

const urlBase = ConnectionAPI()

export const LoginAccount = async (email: string, password: string) => {
  return await GenericRequest({
    url: `${urlBase}users/login`,
    method: 'POST',
    data: {
      email: email,
      password: password,
    },
  })
}

export const RegisterAccount = async (email: string, password: string) => {
  return await GenericRequest({
    url: `${urlBase}users/register`,
    method: 'POST',
    data: {
      email: email,
      password: password,
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

export const GetAllUsers = async () => {
  return await GenericRequestAuth({ url: `${urlBase}users/GetAllUsers`, method: 'GET' })
}

export const RefreshToken = async (token: string) => {
  return await GenericRequest({
    url: `${urlBase}users/refreshToken`,
    method: 'POST',
    data: {
      refreshToken: token,
    },
  })
}
