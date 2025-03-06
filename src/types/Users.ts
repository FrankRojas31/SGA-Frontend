export interface IUser {
  name: string
  email: string
  password: string
  confirmPassword: string
  estatusUsuario: EstatusUsuario
  rol: Rol
}

export interface IUserSend {
  nombre: string
  email: string
  password: string
  duoPassword: string
}

export interface IUserStorage {
  accessToken: string;
  email: string;
  id: string;
  refreshToken: string;
  role: string;
}


export type ILoginUser = Pick<IUser, 'email' | 'password'>;

export enum Rol {
  ADMIN = 'ADMIN',
  ALUMNO = 'ALUMNO',
  SUPERADMIN = 'SUPERADMIN',
}

export enum EstatusUsuario {
  ACTIVO = 0,
  INACTIVO = 1,
}
