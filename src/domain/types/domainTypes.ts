export enum STATUS {
  INITIAL = "INITIAL",
  OK = "OK",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export type Data<T> = {
  data: T;
  status: STATUS;
  message: string;
};

export type SUPPORTED_LANGUAGE = {
  id: string;
  name: string;
};

export type CountryState = {
  id: number;
  name: string;
  state_code: string;
}

export type Country = {
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  emoji: string;
  emojiU: string;
  states: CountryState[];
};
