import { CountryResponse } from "@data/entities/countryResponse";
import { DataResponse } from "@data/entities/dataResponse";
import { Country } from "@domain/entities/country";
import { Data } from "@domain/entities/data";
import { ERROR_TYPES, STATUS } from "@domain/entities/status";

export const convertCountriesResponseToData = (
  data: DataResponse<CountryResponse[]>
): Data<Country[]> => {
  const mappedData: Country[] = (data.data || []).map((country) => ({
    name: country.name || "",
    iso3: country.iso3 || "",
    iso2: country.iso2 || "",
    phone_code: country.phone_code || "",
    emoji: country.emoji || "",
    emojiU: country.emojiU || "",
    states: (country.states || []).map((state) => ({
      id: state.id || -1,
      name: state.name || "",
      state_code: state.state_code || "",
    })),
  }));

  return {
    data: mappedData,
    status: data.status ? STATUS.OK : STATUS.ERROR,
    message: data.message || "",
    errorType: ERROR_TYPES.NONE
  };
};
