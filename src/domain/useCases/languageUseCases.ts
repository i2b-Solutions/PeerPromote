import {
  getStoredLanguageData,
  setStoredLanguageData,
} from "@data/services/language/languageService";
import {
  convertGetStoredLanguageResponseToData,
  convertSetStoredLanguageResponseToData,
} from "@domain/converters/language";
import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";

export const getSystemLanguageUseCase = (): Data<string> => {
  let navigatorLanguage = navigator.language || "";

  if (navigatorLanguage.includes("-")) {
    navigatorLanguage = navigatorLanguage.split("-")[0];
  }

  const sanitizedLanguage = navigatorLanguage.toLowerCase();

  return {
    message: "",
    status: STATUS.OK,
    data: sanitizedLanguage,
  };
};

export const getStoredLanguageUseCase = (): Data<string> => {
  return convertGetStoredLanguageResponseToData(getStoredLanguageData());
};

export const setStoredLanguageUseCase = (language: string): Data<boolean> => {
  return convertSetStoredLanguageResponseToData(
    setStoredLanguageData(language)
  );
};
