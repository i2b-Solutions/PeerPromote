// Get LocalStorage Value
export const getLocalStorageValue = <T>(key: string): T => {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
        throw new Error(`No value found in localStorage for key: ${key}`);
    }
    return JSON.parse(serializedValue) as T;
};


// Set Local Storage Value
export const setLocalStorageValue = <T>(key: string, value: T): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        throw new Error(`Error trying to set localStorage for key: ${key}`);
    }
};
