import { DataResponse } from "@data/entities/dataResponse";
import {
  EmailAvailableResponseData,
  RegisterUserRequestData,
  RegisterUserResponseData,
  UserAvailableResponseData,
} from "@data/entities/signUpEntities";
import { Data } from "@domain/entities/data";
import {
  EmailAvailable,
  RegisterUserRequest,
  RegisterUserResponse,
  UserAvailable,
} from "@domain/entities/signUpEntities";
import { STATUS } from "@domain/entities/status";

export const convertDataToUserAvailableResponse = (
  response: DataResponse<UserAvailableResponseData>
): Data<UserAvailable> => {
  const { data, message, status } = response;
  return {
    data: {
      data: {
        error: data?.data?.error || "",
        message: data?.data?.message || "",
        register: data?.data?.register || false,
      },
      success: data?.success || false,
    },
    message: message,
    status: status ? STATUS.OK : STATUS.ERROR,
  };
};

export const convertDataToEmailAvailableResponse = (
  response: DataResponse<EmailAvailableResponseData>
): Data<EmailAvailable> => {
  const { data, message, status } = response;
  return {
    data: {
      data: {
        error: data?.data?.error || "",
        message: data?.data?.message || "",
        register: data?.data?.register || false,
      },
      success: data?.success || false,
    },
    message: message,
    status: status ? STATUS.OK : STATUS.ERROR,
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
    selfie: request.selfie,
  };
};

export const convertDataToRegisterUserResponse = (
  response: DataResponse<RegisterUserResponseData>
): Data<RegisterUserResponse> => {
  const { data, message, status } = response;
  return {
    data: {
      data: {
        error: data?.data?.error || false,
        message: data?.data?.message || "",
        PersonID: data?.data?.PersonID || -1,
        request: data?.data?.request || "",
        UserID: data?.data?.UserID || -1,
        Username: data?.data?.Username || "",
      },
      success: data?.success || false,
    },
    message: message,
    status: status ? STATUS.OK : STATUS.ERROR,
  };
};
