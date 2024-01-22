import { getLocalStorageValue, setLocalStorageValue } from "@data/localStorage/localStorageManager";
import { convertGetLocalStorageResponseToData, convertSetLocalStorageResponseToData } from "@domain/converters/localStorageConverters";
import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";
import { LOCAL_STORAGE_KEYS } from "@domain/helpers/domainConstants";
import { Data, STATUS } from "@domain/types/domainTypes";

export const getSystemLanguage = (): Data<SYSTEM_LANGUAGES> => {
    let navigatorLanguage = navigator.language || '';

    if (navigatorLanguage.includes('-')) {
        navigatorLanguage = navigatorLanguage.split('-')[0];
    }

    const sanitizedLanguage = navigatorLanguage.toLowerCase() as SYSTEM_LANGUAGES;

    if (!Object.values(SYSTEM_LANGUAGES).includes(sanitizedLanguage)) {
        return {
            message: 'Language not supported',
            status: STATUS.ERROR,
            data: SYSTEM_LANGUAGES.EN
        }
    }

    return {
        message: '',
        status: STATUS.OK,
        data: sanitizedLanguage
    }
};

export const getStoredLanguage = (): Data<SYSTEM_LANGUAGES> =>
    convertGetLocalStorageResponseToData(getLocalStorageValue(LOCAL_STORAGE_KEYS.LANGUAGE));

export const setStoredLanguage = (language: SYSTEM_LANGUAGES): Data<boolean> =>
    convertSetLocalStorageResponseToData(setLocalStorageValue(LOCAL_STORAGE_KEYS.LANGUAGE, language));
