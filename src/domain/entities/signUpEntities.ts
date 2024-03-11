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
  userId: string;
  username: string;
};
