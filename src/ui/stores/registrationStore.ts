import { SupportedLanguage } from "@domain/entities/languageEntities";
import { create } from "zustand";

const userNonAllowedCharacters = /[^a-zA-Z0-9_]/g;

type RegistrationStore = {
  // Step 1
  username: string;
  password: string;
  confirmPassword: string;
  isCompany: boolean;
  location: {
    countryId: string;
    countryName: string;
    stateId: number;
    stateName: string;
  };
  languages: SupportedLanguage[];
  birthdate: { day: number; month: number; year: number };
  // Step 2
  email: string;
  area: string;
  phone: string;
  selfie: File | undefined;
  // Setters
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setIsCompany: (value: boolean) => void;
  setCountry: (id: string, name: string) => void;
  setState: (id: number, name: string) => void;
  setLanguages: (values: SupportedLanguage[]) => void;
  setBirthDay: (value: number) => void;
  setBirthMonth: (value: number) => void;
  setBirthYear: (value: number) => void;
  setEmail: (value: string) => void;
  setArea: (value: string) => void;
  setPhone: (value: string) => void;
  setSelfie: (value: File | undefined) => void;
  resetStore: () => void;
};

const defaultValues = {
  // Step 1
  username: "",
  password: "",
  confirmPassword: "",
  isCompany: false,
  location: {
    countryId: "",
    countryName: "",
    stateId: 0,
    stateName: ""
  },
  languages: [],
  birthdate: { day: 0, month: 0, year: 0 },
  // Step 2
  email: "",
  area: "",
  phone: "",
  selfie: undefined
};

const useRegistrationStore = create<RegistrationStore>((set) => {
  return {
    // Properties
    ...defaultValues,
    // Setters
    setUsername: (value: string) =>
      set({
        username: value.toLowerCase().trim().replace(userNonAllowedCharacters, "")
      }),
    setPassword: (value: string) => set({ password: value.trim() }),
    setConfirmPassword: (value: string) =>
      set({ confirmPassword: value.trim() }),
    setIsCompany: (value: boolean) => set({ isCompany: value }),
    setCountry: (id: string, name: string) =>
      set((state) => ({
        location: { ...state.location, countryId: id, countryName: name }
      })),
    setState: (id: number, name: string) =>
      set((state) => ({
        location: { ...state.location, stateId: id, stateName: name }
      })),
    setLanguages: (values: SupportedLanguage[]) => set({ languages: values }),
    setBirthDay: (value: number) =>
      set((state) => ({ birthdate: { ...state.birthdate, day: value } })),
    setBirthMonth: (value: number) =>
      set((state) => ({ birthdate: { ...state.birthdate, month: value } })),
    setBirthYear: (value: number) =>
      set((state) => ({ birthdate: { ...state.birthdate, year: value } })),
    setEmail: (value: string) => set({ email: value.trim() }),
    setArea: (value: string) => set({ area: value }),
    setPhone: (value: string) => set({ phone: value }),
    setSelfie: (value: File | undefined) => set({ selfie: value }),
    resetStore: () => set({ ...defaultValues })
  };
});

export default useRegistrationStore;
