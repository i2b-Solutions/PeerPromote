import { getStoredLanguage, getSystemLanguage } from '@domain/controllers/languageController/languageController';
import { STATUS, SYSTEM_LANGUAGES } from '@domain/types/domainTypes';
import { create } from 'zustand';

type LanguageStore = {
    language: SYSTEM_LANGUAGES;
    openLanguageModal: boolean;
    setLanguage: (newLanguage: SYSTEM_LANGUAGES) => void;
    setOpenLanguageModal: (open: boolean) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => {
    const storedLanguage = getStoredLanguage();
    const systemLanguage = getSystemLanguage();
    const currentLanguage = storedLanguage.data || systemLanguage.data || SYSTEM_LANGUAGES.EN;

    return ({
        language: currentLanguage,
        openLanguageModal: storedLanguage.status === STATUS.OK ? false : true,
        setLanguage: (newLanguage: SYSTEM_LANGUAGES) => {
            set({ language: newLanguage });
        },
        setOpenLanguageModal: (open: boolean) => {
            set({ openLanguageModal: open })
        }
    })
});
