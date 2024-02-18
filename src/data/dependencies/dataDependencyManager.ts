import { ApiService } from "./api/apiService";
import { LocalStorageService } from "./localStorage/localStorageService";

export class DataDependencyManager {
  private static _apiServiceInstance: ApiService | null = null;
  private static _localStorageServiceInstance: LocalStorageService | null =
    null;

  public static get apiServiceInstance(): ApiService {
    return (
      this._apiServiceInstance ?? (this._apiServiceInstance = new ApiService())
    );
  }

  public static get localStorageServiceInstance(): LocalStorageService {
    return (
      this._localStorageServiceInstance ??
      (this._localStorageServiceInstance = new LocalStorageService())
    );
  }
}
