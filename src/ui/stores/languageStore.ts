import { SYSTEM_LANGUAGES } from '@domain/enums/domainEnums';
import { create } from 'zustand';

type LanguageStore = {
    language: SYSTEM_LANGUAGES;
    openLanguageModal: boolean;
    userTrigger: boolean;
    setLanguage: (newLanguage: SYSTEM_LANGUAGES) => void;
    setOpenLanguageModal: (open: boolean, userTrigger?: boolean) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => {
    return {
        language: SYSTEM_LANGUAGES.EN,
        openLanguageModal: false,
        userTrigger: false,
        setLanguage: (newLanguage: SYSTEM_LANGUAGES) => set({ language: newLanguage }),
        setOpenLanguageModal: (open: boolean, trigger: boolean = false) => {
            set({
                openLanguageModal: open,
                ...(trigger && { userTrigger: trigger }),
            });
        },
    };
});
