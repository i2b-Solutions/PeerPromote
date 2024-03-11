import { DataDependencyManager } from "@data/dependencies/dataDependencyManager";
import { DataResponse } from "@data/entities/dataResponse";
import { SessionStorageData } from "@data/entities/sessionEntities";

const sessionKey = "session";

export const setStoredSessionData = (
  session: SessionStorageData
): DataResponse<boolean> => {
  return DataDependencyManager.localStorageServiceInstance.set<SessionStorageData>(
    sessionKey,
    session
  );
};

export const getStoredSessionData = (): DataResponse<SessionStorageData> => {
  return DataDependencyManager.localStorageServiceInstance.get<SessionStorageData>(
    sessionKey
  );
};
