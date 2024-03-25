import { getCountriesData } from "@data/services/country/countryService";
import { convertCountriesResponseToData } from "@domain/converters/countryConverters";
import { Country } from "@domain/entities/country";
import { Data } from "@domain/entities/data";
import { ERROR_TYPES, STATUS } from "@domain/entities/status";
import { DataCache } from "@domain/helpers/dataCache";

const initialValue: Data<Country[]> = {
  data: [],
  message: "",
  status: STATUS.INITIAL,
  errorType: ERROR_TYPES.NONE
};

const countryCache = new DataCache<Country[]>(initialValue);

const fetchCountries = async () => {
  const response = await getCountriesData();
  return convertCountriesResponseToData(response);
};

export const getCountriesUseCase = async (
  cache: boolean
): Promise<Data<Country[]>> => {
  const cacheValue = await countryCache.fetchDataWithCache(
    fetchCountries,
    cache
  );
  return cacheValue;
};
