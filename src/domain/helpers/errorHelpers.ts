import { ERROR_TYPES, STATUS } from "@domain/entities/status";

export const getStatusType = (
  status: boolean
) => (status ? STATUS.OK : STATUS.ERROR);

export const getErrorType = (
  status: boolean,
  isError: boolean,
  hasData: boolean
) =>
  !status
    ? ERROR_TYPES.NETWORK
    : isError
      ? ERROR_TYPES.SERVER
      : !hasData
        ? ERROR_TYPES.EMPTY
        : ERROR_TYPES.NONE;
