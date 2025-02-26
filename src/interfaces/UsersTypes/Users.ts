export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  status: Status;
  password: string;
  token: string;
}

export enum Status {
  ACTIVO = 0,
  INACTIVO = 1,
}

export type dataFilter = Omit<IUser, "password">

export type IUserToken = Omit<IUser, "status" | "role" | "username">
