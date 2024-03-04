import {
  postEmailAvailabilityData,
  postRegisterUserData,
  postUsernameAvailabilityData,
} from "@data/services/signUp/signUpService";
import {
  convertDataToEmailAvailableResponse,
  convertDataToRegisterUserResponse,
  convertDataToUserAvailableResponse,
  convertRegisterUserRequestToData,
} from "@domain/converters/signUpConverters";
import { RegisterUserRequest } from "@domain/entities/signUpEntities";
import { STATUS } from "@domain/entities/status";

export const checkUsernameAvailabilityUseCase = async (
  username: string
): Promise<{
  status: STATUS;
  message: string;
  isAvailable: boolean;
}> => {
  const response = await postUsernameAvailabilityData({ user: username });
  const { data, message, status } =
    convertDataToUserAvailableResponse(response);
  return {
    status,
    message: data.data.message || message,
    isAvailable: !data.data.register,
  };
};

export const checkEmailAvailabilityUseCase = async (email: string) => {
  const response = await postEmailAvailabilityData({ email: email });
  const { data, message, status } =
    convertDataToEmailAvailableResponse(response);
  return {
    status,
    message: data.data.message || message,
    isAvailable: !data.data.register,
  };
};

export const registerUserUseCase = async (payload: RegisterUserRequest) => {
  const converterPayload = convertRegisterUserRequestToData(payload);
  const response = await postRegisterUserData(converterPayload);
  return convertDataToRegisterUserResponse(response);
};
