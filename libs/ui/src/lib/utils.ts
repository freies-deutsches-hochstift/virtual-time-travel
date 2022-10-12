export type OnSelectPov = (id: string | number) => void;

export const isExternalUrl = (string: string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

export const getAssetUrl = (
  localPath: string,
  assetFilename?: string | null
) => {
  if (!assetFilename) return null;
  if (isExternalUrl(assetFilename)) return assetFilename;
  return [localPath, assetFilename].join('/');
};
