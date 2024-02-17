export enum STATUS {
    INITIAL = 'INITIAL',
    OK = 'OK',
    LOADING = 'LOADING',
    ERROR = 'ERROR'
}

export type Data<T> = {
    data: T;
    status: STATUS;
    message: string;
}

export type SUPPORTED_LANGUAGE = {
    id: string;
    name: string;
}