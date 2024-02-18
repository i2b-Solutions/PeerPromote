import { DataDependencyManager } from "@data/dependencies/dataDependencyManager";
import { DataResponse } from "@data/entities/dataResponse";

const languageKey = "language";

export const setStoredLanguageData = (
  language: string
): DataResponse<boolean> => {
  return DataDependencyManager.localStorageServiceInstance.set<string>(
    languageKey,
    language
  );
};

export const getStoredLanguageData = (): DataResponse<string> => {
  return DataDependencyManager.localStorageServiceInstance.get<string>(
    languageKey
  );
};
