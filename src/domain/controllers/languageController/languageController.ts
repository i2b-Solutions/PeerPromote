import { getLocalStorageValue, setLocalStorageValue } from "@data/localStorage/localStorageManager";
import { LOCAL_STORAGE_KEYS } from "@domain/helpers/domainConstants";
import { DataWrapper, STATUS, SYSTEM_LANGUAGES } from "@domain/types/domainTypes";

export const getSystemLanguage = (): DataWrapper<SYSTEM_LANGUAGES> => {
    let navigatorLanguage = navigator.language || '';

    if (navigatorLanguage.includes('-')) {
        navigatorLanguage = navigatorLanguage.split('-')[0];
    }

    const sanitizedLanguage = navigatorLanguage.toLowerCase() as SYSTEM_LANGUAGES;

    if (!Object.values(SYSTEM_LANGUAGES).includes(sanitizedLanguage)) {
        return {
            message: 'Language not supported',
            status: STATUS.ERROR,
            data: undefined
        }
    }

    return {
        message: '',
        status: STATUS.OK,
        data: sanitizedLanguage
    }
};

export const getStoredLanguage = (): DataWrapper<SYSTEM_LANGUAGES> => {
    try {
        return {
            status: STATUS.OK,
            message: '',
            data: getLocalStorageValue(LOCAL_STORAGE_KEYS.LANGUAGE)
        }
    } catch (error) {
        return {
            status: STATUS.ERROR,
            message: typeof error === 'string' ? error : JSON.stringify(error),
            data: undefined
        }
    }
}

export const setStoredLanguage = (language: SYSTEM_LANGUAGES): DataWrapper<boolean> => {
    try {
        setLocalStorageValue(LOCAL_STORAGE_KEYS.LANGUAGE, language);
        return {
            status: STATUS.OK,
            data: true,
            message: ''
        }
    } catch (error) {
        return {
            status: STATUS.ERROR,
            data: undefined,
            message: typeof error === 'string' ? error : JSON.stringify(error)
        }
    }
}