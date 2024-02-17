const assetsUrl = `${process.env.PUBLIC_URL}/assets`;

export const createJsonAssetUrl = (file: string) => `${assetsUrl}/json/${file}`;
