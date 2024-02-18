import { DataDependencyManager } from "@data/dependencies/dataDependencyManager";
import { CountryResponse } from "@data/entities/countryResponse";
import { createJsonAssetUrl } from "@data/helpers/dataHelpers";

export const getCountriesData = async () => {
  return await DataDependencyManager.apiServiceInstance.get<CountryResponse[]>(
    createJsonAssetUrl("countries.json")
  );
};
