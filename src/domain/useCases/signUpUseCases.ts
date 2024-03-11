import {
  postEmailAvailabilityData,
  postRegisterUserData,
  postUsernameAvailabilityData
} from "@data/services/signUp/signUpService";
import {
  convertDataToEmailAvailableResponse,
  convertDataToRegisterUserResponse,
  convertDataToUserAvailableResponse,
  convertRegisterUserRequestToData
} from "@domain/converters/signUpConverters";
import { IsAvailable } from "@domain/entities/commonEntities";
import { Data } from "@domain/entities/data";
import { RegisterUserRequest } from "@domain/entities/signUpEntities";

export const isUsernameAvailableUseCase = async (
  username: string
): Promise<Data<IsAvailable>> => {
  const response = await postUsernameAvailabilityData({ user: username });
  return convertDataToUserAvailableResponse(response);
};

export const isEmailAvailableUseCase = async (
  email: string
): Promise<Data<IsAvailable>> => {
  const response = await postEmailAvailabilityData({ email: email });
  return convertDataToEmailAvailableResponse(response);
};

export const registerUserUseCase = async (payload: RegisterUserRequest) => {
  const converterPayload = convertRegisterUserRequestToData(payload);
  const response = await postRegisterUserData(converterPayload);
  return convertDataToRegisterUserResponse(response);
};
