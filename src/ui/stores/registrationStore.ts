import { getStoredLanguage, getSystemLanguage } from '@domain/controllers/languageController/languageController';
import { SUPPORTED_LANGUAGES, SYSTEM_LANGUAGES } from '@domain/enums/domainEnums';
import { STATUS } from '@domain/types/domainTypes';
import { create } from 'zustand';

type RegistrationStore = {
    username: string;
    password: string;
    countryId: string;
    stateId: string;
    languages: SUPPORTED_LANGUAGES[];
    birthdate: {day: number | undefined, month: number | undefined, year: number | undefined};
    setUsername: (value:string) => void;
    setPassword: (value:string) => void;
    setCountryId: (value:string) => void;
    setStateId: (value:string) => void;
    setLanguages: (values: SUPPORTED_LANGUAGES[]) => void;
    setBirthDay: (value: number) => void;
    setBirthMonth: (value: number) => void;
    setBirthYear: (value: number) => void;
};

export const useRegistrationStore = create<RegistrationStore>((set) => {
    return {
        username: "",
        password: "",
        countryId: "",
        stateId: "",
        languages: [],
        birthdate: {day: undefined, month: undefined, year: undefined},
        setUsername: (value: string) => set({username: value}),
        setPassword: (value: string) => set({password: value}),
        setCountryId: (value: string) => set({countryId: value}),
        setStateId: (value: string) => set({stateId: value}),
        setLanguages: (values: SUPPORTED_LANGUAGES[]) => set({languages: values}),
        setBirthDay: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, day: value } })),
        setBirthMonth: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, month: value } })),
        setBirthYear: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, year: value } }))
    };
});

export default null;