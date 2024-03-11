import { postSignInUserData } from "@data/services/signIn/signInService";
import {
  convertDataToSignInUserResponse,
  convertSignInUserRequestToData
} from "@domain/converters/signInCoverters";
import { Data } from "@domain/entities/data";
import {
  SignInUserRequest,
  SignInUserResponse
} from "@domain/entities/signInEntities";

export const signInUserUseCase = async (
  payload: SignInUserRequest
): Promise<Data<SignInUserResponse>> => {
  const response = await postSignInUserData(
    convertSignInUserRequestToData(payload)
  );
  return convertDataToSignInUserResponse(response);
};
