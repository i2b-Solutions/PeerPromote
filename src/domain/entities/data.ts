import { STATUS } from "./status";

export type Data<T> = {
  data: T;
  status: STATUS;
  message: string;
};
