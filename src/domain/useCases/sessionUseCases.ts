import {
  getStoredSessionData,
  setStoredSessionData
} from "@data/services/session/sessionService";
import {
  convertDataToSessionStorage,
  convertSessionStorageToData
} from "@domain/converters/sessionConverters";
import { IsSuccessful } from "@domain/entities/commonEntities";
import { Data } from "@domain/entities/data";
import { SessionStorage } from "@domain/entities/sessionEntities";
import { STATUS } from "@domain/entities/status";

export const getStoredSessionUseCase = (): Data<SessionStorage> =>
  convertDataToSessionStorage(getStoredSessionData());

export const setStoredSessionUseCase = (
  session: SessionStorage
): Data<IsSuccessful> => {
  const response = convertSessionStorageToData(session);
  const result = setStoredSessionData(response);
  return {
    status: result.status ? STATUS.OK : STATUS.ERROR,
    message: result.message,
    data: {
      isSuccessful: result.data ?? false
    }
  };
};
