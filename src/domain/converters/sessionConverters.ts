import { DataResponse } from "@data/entities/dataResponse";
import { SessionStorageData } from "@data/entities/sessionEntities";
import { Data } from "@domain/entities/data";
import { SessionStorage } from "@domain/entities/sessionEntities";
import { STATUS } from "@domain/entities/status";

export const convertDataToSessionStorage = (
  response: DataResponse<SessionStorageData>
): Data<SessionStorage> => {
  const { message, status, data } = response;
  return {
    data: {
      userId: data?.userId || "",
      username: data?.username || "",
      loggedIn: data?.loggedIn ?? false,
      isCompany: data?.isCompany ?? false
    },
    message: message,
    status: status ? STATUS.OK : STATUS.ERROR
  };
};

export const convertSessionStorageToData = ({
  userId,
  username,
  loggedIn,
  isCompany
}: SessionStorage): SessionStorageData => ({
  userId,
  username,
  loggedIn,
  isCompany
});
