import { getStoredLanguage, getSystemLanguage } from "@domain/controllers/languageController/languageController";
import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";
import { STATUS } from "@domain/types/domainTypes";

export const getAppLanguage = (): { language: SYSTEM_LANGUAGES, openModal: boolean } => {
    const storedLanguage = getStoredLanguage();
    const systemLanguage = getSystemLanguage();

    let currentLanguage = SYSTEM_LANGUAGES.EN;

    if (storedLanguage.status === STATUS.OK) {
        currentLanguage = storedLanguage.data;
    } else if (systemLanguage.status === STATUS.OK) {
        currentLanguage = systemLanguage.data;
    }

    return {
        language: currentLanguage,
        openModal: storedLanguage.status !== STATUS.OK
    }
}