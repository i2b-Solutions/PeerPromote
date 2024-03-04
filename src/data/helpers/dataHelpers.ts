const assetsUrl = `${process.env.PUBLIC_URL}/assets`;
const backendUrl = `${process.env.REACT_APP_BACKEND_URL}`;

export const createJsonAssetUrl = (file: string) => `${assetsUrl}/json/${file}`;

export const createBackendUrl = (path: string) => `${backendUrl}${path}`;
