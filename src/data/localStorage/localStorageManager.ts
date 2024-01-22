import { DataResponse } from "@data/types/dataTypes";

// Get LocalStorage Value
export const getLocalStorageValue = <T>(key: string): DataResponse<T> => {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
        return {
            data: undefined,
            status: false,
            message: `No value found in localStorage for key: ${key}`
        }
    }
    return {
        data: JSON.parse(serializedValue) as T,
        status: true,
        message: ''
    }
};


// Set Local Storage Value
export const setLocalStorageValue = <T>(key: string, value: T): DataResponse<boolean> => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return {
            data: true,
            status: true,
            message: ''
        }
    } catch (error) {
        return {
            data: false,
            status: false,
            message: `Error trying to set localStorage for key: ${key}`
        }
    }
};
