import { Country } from "@domain/entities/country";
import { Data } from "@domain/entities/data";
import { getCountriesUseCase } from "@domain/useCases/getCountryUseCase";

export class CountryController {
  static async getCountries(cache: boolean = true): Promise<Data<Country[]>> {
    return getCountriesUseCase(cache);
  }
}
