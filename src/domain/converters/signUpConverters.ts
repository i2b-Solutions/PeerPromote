import { DataResponse } from "@data/entities/dataResponse";
import {
  EmailAvailableResponseData,
  RegisterUserRequestData,
  RegisterUserResponseData,
  UserAvailableResponseData
} from "@data/entities/signUpEntities";
import { IsAvailable } from "@domain/entities/commonEntities";
import { Data } from "@domain/entities/data";
import {
  RegisterUserRequest,
  RegisterUserResponse
} from "@domain/entities/signUpEntities";
import { STATUS } from "@domain/entities/status";

export const convertDataToUserAvailableResponse = (
  response: DataResponse<UserAvailableResponseData>
): Data<IsAvailable> => {
  const { data, message, status } = response;
  const isError = data?.data?.error === "true";
  const hasData = data?.data?.register !== undefined;
  const isRegistered = data?.data?.register ?? true;

  return {
    data: {
      isAvailable: !isRegistered
    },
    message: data?.data?.message || message,
    status: status && !isError && hasData ? STATUS.OK : STATUS.ERROR
  };
};

export const convertDataToEmailAvailableResponse = (
  response: DataResponse<EmailAvailableResponseData>
): Data<IsAvailable> => {
  const { data, message, status } = response;
  const isError = data?.data?.error === "true";
  const isRegistered = data?.data?.register ?? true;
  const hasData = data?.data?.register !== undefined;

  return {
    data: {
      isAvailable: !isRegistered
    },
    message: data?.data?.message || message,
    status: status && !isError && hasData ? STATUS.OK : STATUS.ERROR
  };
};

export const convertRegisterUserRequestToData = (
  request: RegisterUserRequest
): RegisterUserRequestData => {
  return {
    user: request.username,
    pass: request.password,
    confirmPassword: request.confirmPassword,
    CountryID: request.countryId.toUpperCase(),
    CityID: request.stateId,
    isCompany: request.isCompany,
    languages: request.languages.map((language) => ({ lang: language.id })),
    birthdate: request.birthdate,
    email: request.email,
    area: request.area,
    Phone: request.phone,
    selfie: request.selfie
  };
};

export const convertDataToRegisterUserResponse = (
  response: DataResponse<RegisterUserResponseData>
): Data<RegisterUserResponse> => {
  const { data, message, status } = response;
  const isError = data?.data?.error ?? false;
  const hasData = !!data?.data?.Username && !!data.data.UserID;

  return {
    data: {
      userId: `${data?.data?.UserID}` || "",
      username: data?.data?.Username || ""
    },
    message: data?.data?.message || message,
    status: status && !isError && hasData ? STATUS.OK : STATUS.ERROR
  };
};
