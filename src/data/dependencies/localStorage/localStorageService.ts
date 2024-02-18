import { DataResponse } from "@data/entities/dataResponse";

export class LocalStorageService {
  // Get LocalStorage Value
  public get<T>(key: string): DataResponse<T> {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return {
        data: undefined,
        status: false,
        message: `No value found in localStorage for key: ${key}`,
      };
    }
    return {
      data: JSON.parse(serializedValue) as T,
      status: true,
      message: "",
    };
  }

  // Set Local Storage Value
  public set<T>(
    key: string,
    value: T
  ): DataResponse<boolean> {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return {
        data: true,
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        data: false,
        status: false,
        message: `Error trying to set localStorage for key: ${key}`,
      };
    }
  }
}
