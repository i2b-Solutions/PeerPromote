import { DataResponse } from "@data/entities/dataResponse";
import {
  SignInUserRequestData,
  SignInUserResponseData
} from "@data/entities/signInEntities";
import { Data } from "@domain/entities/data";
import {
  SignInUserRequest,
  SignInUserResponse
} from "@domain/entities/signInEntities";
import { STATUS } from "@domain/entities/status";

export const convertDataToSignInUserResponse = (
  response: DataResponse<SignInUserResponseData>
): Data<SignInUserResponse> => {
  const { message, status, data } = response;
  
  const userData = data?.data?.request?.[0] || {};
  const isError = data?.data?.error === "true";
  const hasUserData = !!userData.UserID && !!userData.Username;

  return {
    data: {
      userId: userData.UserID || "",
      username: userData.Username || ""
    },
    message: data?.data?.message || message,
    status: status && !isError && hasUserData ? STATUS.OK : STATUS.ERROR
  };
};

export const convertSignInUserRequestToData = ({
  user,
  pass
}: SignInUserRequest): SignInUserRequestData => ({
  user,
  pass
});
