import { createJsonAssetUrl } from "@data/helpers/dataHelpers";
import { getRequest } from "@data/request/requestManager";
import { CountryResponse } from "@data/types/dataTypes";

export const getCountriesFile = async () =>
  await getRequest<CountryResponse[]>(createJsonAssetUrl("countries.json"));
