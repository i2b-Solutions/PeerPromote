import { DataResponse } from "@data/entities/dataResponse";
import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";

export const convertGetStoredLanguageResponseToData = (
  data: DataResponse<string>
): Data<string> => {
  return {
    data: data.data || "",
    message: data.message || "",
    status: data.status ? STATUS.OK : STATUS.ERROR,
  };
};

export const convertSetStoredLanguageResponseToData = (
  data: DataResponse<boolean>
): Data<boolean> => {
  return {
    data: data.data || false,
    message: data.message || "",
    status: data.status ? STATUS.OK : STATUS.ERROR,
  };
};
