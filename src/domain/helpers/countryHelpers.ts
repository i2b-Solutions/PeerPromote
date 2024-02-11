import { SUPPORTED_STATES } from "@domain/constants/domainConstants";

type States = {
    name: string,
    id: number
}

export const getCountryStates = (countryId: string): States[]  => {
    const country = SUPPORTED_STATES.find(element => element.id === countryId);

    if (country) {
        return country.states;
    } else {
        return [];
    }
}
