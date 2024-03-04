import { DataResponse } from "@data/entities/dataResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const timeout = 10000;
const retries = 6;
const retryInterval = 10000;

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  public async get<T>(url: string): Promise<DataResponse<T>> {
    return this.request<T>(() => this.axiosInstance.get<T>(url, { timeout }));
  }

  public async post<T>(url: string, data: any): Promise<DataResponse<T>> {
    return this.request<T>(() =>
      this.axiosInstance.post<T>(url, data, { timeout })
    );
  }

  private async request<T>(
    requestFunction: () => Promise<AxiosResponse<T>>
  ): Promise<DataResponse<T>> {
    let returnValue: DataResponse<T> = {
      data: undefined,
      message: "",
      status: false,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await requestFunction();
        returnValue = {
          message: "",
          status: response.status === 200,
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
