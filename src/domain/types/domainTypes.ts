export enum STATUS {
    INITIAL,
    OK,
    LOADING,
    ERROR
}

export type DataWrapper<T> = {
    data?: T;
    status: STATUS;
    message: string;
}

export enum SYSTEM_LANGUAGES {
    ES = 'es',
    EN = 'en'
}