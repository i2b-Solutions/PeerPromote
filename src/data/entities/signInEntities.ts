export type SignInUserRequestData = {
  user: string;
  pass: string;
};

export type SignInUserResponseData = {
  success?: string;
  data?: {
    "logged-in"?: boolean;
    IsCompany?: boolean;
    error?: string;
    message?: string;
    request?: {
      Username?: string;
      UserID?: string;
    }[];
  };
};
