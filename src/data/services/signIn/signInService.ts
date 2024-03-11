import { DataDependencyManager } from "@data/dependencies/dataDependencyManager";
import {
  SignInUserRequestData,
  SignInUserResponseData
} from "@data/entities/signInEntities";
import { createBackendUrl } from "@data/helpers/dataHelpers";

export const postSignInUserData = async (data: SignInUserRequestData) => {
  return await DataDependencyManager.apiServiceInstance.post<SignInUserResponseData>(
    createBackendUrl("/user/auth"),
    data
  );
};
