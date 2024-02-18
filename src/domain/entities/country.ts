export type CountryState = {
  id: number;
  name: string;
  state_code: string;
};

export type Country = {
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  emoji: string;
  emojiU: string;
  states: CountryState[];
};
