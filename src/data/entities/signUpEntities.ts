export type UserAvailableResponseData = {
  data?: {
    isAvailable?: boolean;
  };
  success?: boolean;
  message?: "";
};

export type UserAvailableRequestData = {
  user: string;
};

export type EmailAvailableResponseData = {
  data?: {
    isAvailable?: boolean;
  };
  success?: boolean;
  message?: "";
};

export type EmailAvailableRequestData = {
  email: string;
};

export type RegisterUserRequestData = {
  user: string;
  pass: string;
  confirmPassword: string;
  countryId: string;
  isCompany: number;
  cityId: number;
  languages: {
    lang: string;
  }[];
  birthdate: string;
  email: string;
  area: string;
  phone: string;
  selfie: File;
};

export type RegisterUserResponseData = {
  data?: {
    userId?: string;
    username?: string;
  };
  success?: boolean;
  message?: "";
};
