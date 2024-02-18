export type CountryResponse = {
    name?: string;
    iso3?: string;
    iso2?: string;
    phone_code?: string;
    emoji?: string;
    emojiU?: string;
    states?: {
      id?: number;
      name?: string;
      state_code?: string;
    }[];
  };
  