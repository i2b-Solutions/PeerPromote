export type SignInUserRequestData = {
  user: string;
  pass: string;
};

export type SignInUserResponseData = {
  success?: string;
  data?: {
    error?: string;
    message?: string;
    request?: {
      Username?: string;
      UserID?: string;
    }[];
  };
};
