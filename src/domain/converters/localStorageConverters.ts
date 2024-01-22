import { DataResponse } from "@data/types/dataTypes";
import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";
import { Data, STATUS } from "@domain/types/domainTypes";

export const convertGetLocalStorageResponseToData = (data: DataResponse<SYSTEM_LANGUAGES>): Data<SYSTEM_LANGUAGES> => {
    return {
        data: data.data || SYSTEM_LANGUAGES.EN,
        status: data.status ? STATUS.OK : STATUS.ERROR,
        message: data.message
    }
} 

export const convertSetLocalStorageResponseToData = (data: DataResponse<boolean>): Data<boolean> => {
    return {
        data: data.data || false,
        status: data.status ? STATUS.OK : STATUS.ERROR,
        message: data.message
    }
} 
