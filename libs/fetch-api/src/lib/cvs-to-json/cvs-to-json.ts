/**
 * csv to json converter
 * delimiter "," + use quotes
 * csv keys can be plain values or hieretical string representations
 * eg: the key "object.key.subkey" will be interpreted as { object: { key: { subkey: <somevalue> } } }
 * hieretical strings are commonly used in this project for localized fields or povs/fences coordinates
 */

import merge from 'ts-deepmerge';

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
      const subKeys = key.split('.');
      const keyValue = plainOrParsed(value, index);
      const baseObjToClone = obj as VariableObjectKeys;
      let baseObj = { ...baseObjToClone } as VariableObjectKeys;

      const redObject = {} as VariableObjectKeys;
      let tempObject = redObject as VariableObjectKeys | string;

      subKeys.map((k, i, values) => {
        if (typeof tempObject !== 'string') {
          tempObject = tempObject[k] = i == values.length - 1 ? keyValue : {};
        }
      });

      baseObj = !baseObj ? redObject : merge(baseObj, redObject);

      return (obj = baseObj), obj;
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
    // will enter here if value is text/null/ ...
    // we do not really need to catch
    // if not parsable we use directly the given value
    // console.debug(error);
  }
  return value;
}
