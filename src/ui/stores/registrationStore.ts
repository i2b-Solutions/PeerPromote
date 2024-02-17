import { SUPPORTED_LANGUAGE } from '@domain/types/domainTypes';
import { create } from 'zustand';

type RegistrationStore = {
    // Step 1
    username: string;
    password: string;
    confirmPassword: string;
    countryId: string;
    stateId: string;
    languages: SUPPORTED_LANGUAGE[];
    birthdate: { day: number, month: number, year: number };
    // Step 2
    email: string;
    area: string;
    phone: string;
    selfie: File | undefined;
    // Setters
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setCountryId: (value: string) => void;
    setStateId: (value: string) => void;
    setLanguages: (values: SUPPORTED_LANGUAGE[]) => void;
    setBirthDay: (value: number) => void;
    setBirthMonth: (value: number) => void;
    setBirthYear: (value: number) => void;
    setEmail: (value: string) => void;
    setArea: (value: string) => void;
    setPhone: (value: string) => void;
    setSelfie: (value: File | undefined) => void;
};

const useRegistrationStore = create<RegistrationStore>((set) => {
    return {
        // Step 1
        username: "",
        password: "",
        confirmPassword: "",
        countryId: "",
        stateId: "",
        languages: [],
        birthdate: { day: 0, month: 0, year: 0 },
        // Step 2
        email: "",
        area: "",
        phone: "",
        selfie: undefined,
        // Setters
        setUsername: (value: string) => set({ username: value.toLowerCase().trim() }),
        setPassword: (value: string) => set({ password: value.trim() }),
        setConfirmPassword: (value: string) => set({ confirmPassword: value.trim() }),
        setCountryId: (value: string) => set({ countryId: value }),
        setStateId: (value: string) => set({ stateId: value }),
        setLanguages: (values: SUPPORTED_LANGUAGE[]) => set({ languages: values }),
        setBirthDay: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, day: value } })),
        setBirthMonth: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, month: value } })),
        setBirthYear: (value: number) => set((state) => ({ birthdate: { ...state.birthdate, year: value } })),
        setEmail: (value: string) => set({ email: value.trim() }),
        setArea: (value: string) => set({ area: value }),
        setPhone: (value: string) => set({ phone: value }),
        setSelfie: (value: File | undefined) => set({ selfie: value })
    };
});

export default useRegistrationStore;