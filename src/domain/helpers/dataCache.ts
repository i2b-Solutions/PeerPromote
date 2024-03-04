import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";

export class DataCache<T> {
  private lastCallTime: number = 0;
  private fetchInterval: number;

  constructor(
    private cacheData: Data<T>,
    intervalMinutes: number = 15
  ) {
    this.fetchInterval = 1000 * 60 * intervalMinutes;
  }

  async fetchDataWithCache(
    fetchDataFunction: () => Promise<Data<T>>,
    cache: boolean = true
  ): Promise<Data<T>> {
    const { lastCallTime, fetchInterval, cacheData } = this;

    if (
      cache &&
      cacheData.status === STATUS.OK &&
      Date.now() - lastCallTime < fetchInterval
    ) {
      return cacheData;
    }

    const dataResponse = await fetchDataFunction();

    this.cacheData = dataResponse;
    this.lastCallTime = Date.now();

    return this.cacheData;
  }
}
