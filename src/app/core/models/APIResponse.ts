export default interface APIResponse<T> {
  success: boolean;
  message: string;
  code: number;
  internalMessage: string; // TODO: It might be removed. Don't rely on this.
  data: T;
  errors: string[];
  apiVersion: number;
}
