import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";

export const isLanguageSupported = (language: string): boolean => {
  return Object.values(SYSTEM_LANGUAGES).includes(language as SYSTEM_LANGUAGES);
};
