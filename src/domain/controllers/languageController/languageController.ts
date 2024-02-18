import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";
import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";
import { isLanguageSupported } from "@domain/helpers/languageHelpers";
import {
  getStoredLanguageUseCase,
  getSystemLanguageUseCase,
  setStoredLanguageUseCase,
} from "@domain/useCases/languageUseCases";

export class LanguageController {
  private static getSystemLanguage(): Data<SYSTEM_LANGUAGES> {
    const systemLanguage = getSystemLanguageUseCase();
    const language = systemLanguage.data;

    return isLanguageSupported(language)
      ? {
          data: language as SYSTEM_LANGUAGES,
          message: systemLanguage.message,
          status: systemLanguage.status,
        }
      : {
          data: SYSTEM_LANGUAGES.EN,
          message: "language not supported",
          status: STATUS.ERROR,
        };
  }

  private static getStoredLanguage = () => {
    const storedLanguage = getStoredLanguageUseCase();
    const language = storedLanguage.data;

    return isLanguageSupported(language)
      ? {
          data: language as SYSTEM_LANGUAGES,
          message: storedLanguage.message,
          status: storedLanguage.status,
        }
      : {
          data: SYSTEM_LANGUAGES.EN,
          message: "language not supported",
          status: STATUS.ERROR,
        };
  };

  public static setStoredLanguage = (
    language: SYSTEM_LANGUAGES
  ): Data<boolean> => {
    return setStoredLanguageUseCase(language);
  };

  public static getAppLanguage = (): {
    language: SYSTEM_LANGUAGES;
    openModal: boolean;
  } => {
    const storedLanguage = this.getStoredLanguage();
    const systemLanguage = this.getSystemLanguage();
    let currentLanguage = SYSTEM_LANGUAGES.EN;

    if (storedLanguage.status === STATUS.OK) {
      currentLanguage = storedLanguage.data;
    } else if (systemLanguage.status === STATUS.OK) {
      currentLanguage = systemLanguage.data;
    }

    return {
      language: currentLanguage,
      openModal: storedLanguage.status !== STATUS.OK,
    };
  };
}
