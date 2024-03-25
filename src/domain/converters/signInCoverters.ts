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
import { ERROR_TYPES, STATUS } from "@domain/entities/status";

export const convertDataToSignInUserResponse = (
  response: DataResponse<SignInUserResponseData>
): Data<SignInUserResponse> => {
  const { message, status, data } = response;

  const loggedIn = data?.data?.["logged-in"] ?? false;
  const isCompany = data?.data?.IsCompany ?? false;
  const userData = data?.data?.request?.[0] || {};
  const isError = data?.data?.error === "true";

  return {
    data: {
      loggedIn: loggedIn,
      userId: userData.UserID || "",
      username: userData.Username || "",
      isCompany: isCompany,
      success: data?.success === "true"
    },
    message: data?.data?.message || message,
    status: status && !isError ? STATUS.OK : STATUS.ERROR,
    errorType: ERROR_TYPES.NONE
  };
};

export const convertSignInUserRequestToData = ({
  user,
  pass
}: SignInUserRequest): SignInUserRequestData => ({
  user,
  pass
});
