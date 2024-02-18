import { DataResponse } from "@data/entities/dataResponse";
import axios, { AxiosInstance } from "axios";

const timeout = 10000;
const retries = 3;
const retryInterval = 10000;

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  public async get<T>(url: string): Promise<DataResponse<T>> {
    let returnValue: DataResponse<T> = {
      data: undefined,
      message: "",
      status: false,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await this.axiosInstance.get<T>(url, { timeout });
        returnValue = {
          message: "",
          status: true,
          data: response.data,
        };
        break;
      } catch (error) {
        returnValue = {
          message: `${JSON.stringify(error)}`,
          status: false,
          data: undefined,
        };

        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }
    }

    return returnValue;
  }
}
