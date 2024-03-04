export type UserAvailable = {
  success: boolean;
  data: {
    error: string;
    register: boolean;
    message: string;
  };
};

export type EmailAvailable = {
  success: boolean;
  data: {
    error: string;
    register: boolean;
    message: string;
  };
};

export type RegisterUserRequest = {
  username: string;
  password: string;
  confirmPassword: string;
  countryId: string;
  stateId: number;
  isCompany: boolean;
  languages: {
    id: string;
    name: string;
  }[];
  birthdate: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
  area: string;
  phone: string;
  selfie: File;
};

export type RegisterUserResponse = {
  success: boolean;
  data: {
    error: boolean;
    message: string;
    request: string;
    UserID: number;
    PersonID: number;
    Username: string;
  };
};
