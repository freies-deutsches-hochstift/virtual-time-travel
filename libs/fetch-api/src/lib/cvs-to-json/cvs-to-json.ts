// TODO as actually lib, currently we just quickly need data
// warning do not use in production!

export interface CvsToJsonRes {
  data: Array<unknown> | null;
}

interface IObjectKeys {
  [key: string]: string | number;
}

export function cvsToJson(data: string, delimiter?: string): CvsToJsonRes {
  const keyDelimeter = delimiter || '|';

  const keys = data
    .slice(0, data.indexOf('\n'))
    .replace(/"/g, '')
    .split(keyDelimeter);

  const json = data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.replace(/"/g, '').split(keyDelimeter);
      return keys.reduce(
        (obj: IObjectKeys, key: string, index) => (
          (obj[key] = plainOrParsed(values, index)), obj
        ),
        {}
      );
    });

  return { data: json };
}

/**
 * CVS could contain more than text
 * this method parses eventual arrays/objects/etc
 * so that the data does not require further transformations
 */

function plainOrParsed(values: string[], index: number) {
  let value = values[index];
  try {
    value = JSON.parse(value);
  } catch (error) {
    // console.debug(error);
  }
  return value;
}
