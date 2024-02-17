import { SUPPORTED_LANGUAGE } from "@domain/types/domainTypes";

export const SUPPORTED_COUNTRIES = [{
    name: 'El Salvador',
    id: 'sv'
}]

export const SUPPORTED_STATES = [
    {
        id: 'sv',
        states: [
            { id: 1, name: "Ahuachapán" },
            { id: 2, name: "Cabañas" },
            { id: 3, name: "Chalatenango" },
            { id: 4, name: "Cuscatlán" },
            { id: 5, name: "La Libertad" },
            { id: 6, name: "La Paz" },
            { id: 7, name: "La Unión" },
            { id: 8, name: "Morazán" },
            { id: 9, name: "San Miguel" },
            { id: 10, name: "San Salvador" },
            { id: 11, name: "San Vicente" },
            { id: 12, name: "Santa Ana" },
            { id: 13, name: "Sonsonate" },
            { id: 14, name: "Usulután" }
        ]
    }
];

export const SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGE[] = [
    {
        id: 'en',
        name: 'English'
    },
    {
        id: 'es',
        name: 'Español'
    }
]