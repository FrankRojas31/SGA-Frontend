export interface ResponseHelper<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
