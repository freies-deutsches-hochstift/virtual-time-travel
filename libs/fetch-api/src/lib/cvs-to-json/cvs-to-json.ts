export interface CvsToJsonRes {
  data: Array<unknown> | null;
}

interface VariableObjectKeys {
  [key: string]: string | number | VariableObjectKeys;
}

const commaRegex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g;
const quotesRegex = /^"(.*)"$/g;

export function cvsToJson(text: string): CvsToJsonRes {
  const csv = text.trim();

  const keys = csv
    .slice(0, csv.indexOf('\n'))
    .split(commaRegex)
    .map((h) => h.replace(quotesRegex, '$1'));

  const values = csv
    .slice(csv.indexOf('\n') + 1)
    .split('\n')
    .map((v) => v.split(commaRegex).map((h) => h.replace(quotesRegex, '$1')));

  const data = values.map((value) => {
    return keys.reduce((obj: VariableObjectKeys, key: string, index) => {
      // TODO !! this can cover only one level deep!
      const [baseKey, subKey] = key.split('.');

      if (subKey) {
        let localisedObj = obj[baseKey] as VariableObjectKeys;

        const localisedValue = {
          [subKey]: plainOrParsed(value, index),
        } as VariableObjectKeys;

        localisedObj = { ...localisedObj, ...localisedValue };

        return (obj[baseKey] = localisedObj), obj;
      }

      return (obj[baseKey] = plainOrParsed(value, index)), obj;
    }, {});
  });

  return { data };
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
