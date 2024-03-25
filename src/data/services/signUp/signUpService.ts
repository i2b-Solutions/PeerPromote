import { DataDependencyManager } from "@data/dependencies/dataDependencyManager";
import {
  EmailAvailableRequestData,
  EmailAvailableResponseData,
  RegisterUserRequestData,
  RegisterUserResponseData,
  UserAvailableRequestData,
  UserAvailableResponseData,
} from "@data/entities/signUpEntities";
import { createBackendUrl } from "@data/helpers/dataHelpers";

export const postUsernameAvailabilityData = async (
  data: UserAvailableRequestData
) => {
  return await DataDependencyManager.apiServiceInstance.post<UserAvailableResponseData>(
    createBackendUrl("/user/check_username"),
    data
  );
};

export const postEmailAvailabilityData = async (
  data: EmailAvailableRequestData
) => {
  return await DataDependencyManager.apiServiceInstance.post<EmailAvailableResponseData>(
    createBackendUrl("/user/check_email"),
    data
  );
};

export const postRegisterUserData = async (data: FormData) => {
  return await DataDependencyManager.apiServiceInstance.post<RegisterUserResponseData>(
    createBackendUrl("/user/register"),
    data
  );
};
