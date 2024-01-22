import { getStoredLanguage, getSystemLanguage } from '@domain/controllers/languageController/languageController';
import { SYSTEM_LANGUAGES } from '@domain/enums/domainEnums';
import { STATUS } from '@domain/types/domainTypes';
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

    const currentLanguage = storedLanguage.status === STATUS.OK ?
        storedLanguage.data : (systemLanguage.status === STATUS.OK ? systemLanguage.data : SYSTEM_LANGUAGES.EN);

    return {
        language: currentLanguage,
        openLanguageModal: storedLanguage.status !== STATUS.OK,
        setLanguage: (newLanguage: SYSTEM_LANGUAGES) => set({ language: newLanguage }),
        setOpenLanguageModal: (open: boolean) => set({ openLanguageModal: open }),
    };
});
