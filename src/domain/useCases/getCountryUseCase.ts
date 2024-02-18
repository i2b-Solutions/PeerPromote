import { getCountriesData } from "@data/services/country/countryService";
import { convertCountriesResponseToData } from "@domain/converters/countryConverters";
import { Country } from "@domain/entities/country";
import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";

const initialValue = {
  data: [],
  message: "",
  status: STATUS.INITIAL,
};

let lastCallTime: number = 0;
const fetchInterval = 1000 * 60 * 15; // 15 minutes
let cacheData: Data<Country[]> = initialValue;

export const getCountriesUseCase = async (
  cache: boolean
): Promise<Data<Country[]>> => {
  if (
    Date.now() - lastCallTime < fetchInterval &&
    cache &&
    cacheData.status === STATUS.OK
  ) {
    return cacheData;
  }

  const countriesDataResponse = await getCountriesData();

  cacheData = convertCountriesResponseToData(countriesDataResponse);
  lastCallTime = Date.now();

  return cacheData;
};
