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
import { ERROR_TYPES, STATUS } from "@domain/entities/status";
import { convertDateToString } from "@domain/helpers/dateHelpers";
import { getErrorType, getStatusType } from "@domain/helpers/errorHelpers";

export const convertDataToUserAvailableResponse = (
  response: DataResponse<UserAvailableResponseData>
): Data<IsAvailable> => {
  const { data, message, status } = response;

  const isAvailable = data?.data?.isAvailable === true;
  const isError = data?.success !== true;
  const hasData = data?.data?.isAvailable !== undefined;

  return {
    data: { isAvailable },
    message: data?.message || message,
    status: getStatusType(status),
    errorType: getErrorType(status, isError, hasData)
  };
};

export const convertDataToEmailAvailableResponse = (
  response: DataResponse<EmailAvailableResponseData>
): Data<IsAvailable> => {
  const { data, message, status } = response;

  const isAvailable = data?.data?.isAvailable === true;
  const isError = data?.success !== true;
  const hasData = data?.data?.isAvailable !== undefined;

  return {
    data: {
      isAvailable: isAvailable
    },
    message: data?.message || message,
    status: getStatusType(status),
    errorType: getErrorType(status, isError, hasData)
  };
};

export const convertRegisterUserRequestToFormData = (
  request: RegisterUserRequest
): FormData => {
  const formData = new FormData();

  formData.append("user", request.username);
  formData.append("pass", request.password);
  formData.append("confirmPassword", request.confirmPassword);
  formData.append("countryId", request.countryId.toUpperCase());
  formData.append("cityId", String(request.stateId));
  formData.append("isCompany", request.isCompany ? "1" : "0");

  request.languages.forEach((language, index) => {
    formData.append(`languages[${index}][lang]`, language.id);
  });

  formData.append(
    "birthdate",
    convertDateToString(
      request.birthdate.day,
      request.birthdate.month,
      request.birthdate.year
    )
  );

  formData.append("email", request.email);
  formData.append("area", request.area);
  formData.append("phone", request.phone);
  formData.append("selfie", request.selfie);

  return formData;
};

export const convertDataToRegisterUserResponse = (
  response: DataResponse<RegisterUserResponseData>
): Data<RegisterUserResponse> => {
  const { data, message, status } = response;
  const { userId, username } = data?.data || {};

  const isError = data?.success !== true;
  const hasData = !!userId && !!username;

  return {
    data: {
      userId: `${data?.data?.userId}` || "",
      username: data?.data?.username || ""
    },
    message: data?.message || message,
    status: getStatusType(status),
    errorType: getErrorType(status, isError, hasData)
  };
};
