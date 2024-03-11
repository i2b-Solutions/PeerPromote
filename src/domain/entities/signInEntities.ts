export type SignInUserRequest = {
  user: string;
  pass: string;
};

export type SignInUserResponse = {
  username: string;
  userId: string;
};
