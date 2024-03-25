import { ERROR_TYPES, STATUS } from "./status";

export type Data<T> = {
  data: T;
  status: STATUS;
  message: string;
  errorType: ERROR_TYPES
};
