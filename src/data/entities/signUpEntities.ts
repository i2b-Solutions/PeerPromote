export type UserAvailableResponseData = {
  success?: boolean;
  data?: {
    error?: string;
    register?: boolean;
    message?: string;
  };
};

export type UserAvailableRequestData = {
  user: string;
};

export type EmailAvailableResponseData = {
  success?: boolean;
  data?: {
    error?: string;
    register?: boolean;
    message?: string;
  };
};

export type EmailAvailableRequestData = {
  email: string;
};

export type RegisterUserRequestData = {
  user: string;
  pass: string;
  confirmPassword: string;
  CountryID: string;
  IsCompany: number;
  CityID: number;
  languages: {
    lang: string;
  }[];
  birthdate: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
  area: string;
  Phone: string;
  selfie: File;
};

export type RegisterUserResponseData = {
  success?: boolean;
  data?: {
    error?: boolean;
    message?: string;
    request?: string;
    UserID?: number;
    PersonID?: number;
    Username?: string;
  };
};
