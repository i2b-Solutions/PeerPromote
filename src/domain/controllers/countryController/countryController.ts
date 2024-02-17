import { getCountriesFile } from "@data/country/countryManager";
import { convertCountryResponseToData } from "@domain/converters/countryConverters";
import { Country, Data } from "@domain/types/domainTypes";

export const getCountryList = async (): Promise<Data<Country[]>> =>
  convertCountryResponseToData(await getCountriesFile());
