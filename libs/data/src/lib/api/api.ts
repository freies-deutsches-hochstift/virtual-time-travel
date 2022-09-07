import { parse } from 'csv-parse/browser/esm/sync';
import { useState } from 'react';
import { csvtojson } from 'libs/csvtojson/src';

export interface useAPIProps {
  root: string;
  api: string;
  options: {
    endPoint?: string;
    token?: string;
    tokenFormat?: string;
    mode?: 'json' | 'csv';
    template?: any;
  };
}

export function useAPI(
  root: string,
  api: string,
  options: {
    endPoint?: string;
    token?: string;
    tokenFormat?: `?access_token=`;
    mode?: 'json' | 'csv';
    template?: any;
  }
) {
  let url = `${root}/${api}`;
  if (options.endPoint) {
    url += `/${options.endPoint}`;
  }
  if (options.token) {
    url += `${options.tokenFormat}${options.token}`;
  }
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'failed'>(
    'idle'
  );

  // TODO Clarify how to parse JSON without any in TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Array<any> | string | undefined>();

  if (state === 'idle') {
    setState('loading');
    if (!data) {
      fetch(url)
        .then((response) => {
          console.log('response', response);
          return response.text();
        })
        .then((data) => {
          if (mode === 'json') {
            try {
              const json = JSON.parse(data);
              if (json.data && Object.keys(json).length === 1) {
                setData(json.data);
              } else {
                setData(json);
                setState('loaded');
              }
            } catch (error) {
              setState('failed');
              console.error('Failed to parse API response as JSON', error);
            }
          }
          if (mode === 'csv') {
            try {
              const csv = parse(data, { columns: true });
              setData(template ? csvtojson(csv, template) : csv);
              setState('loaded');
            } catch (error) {
              setState('failed');
              console.error('Failed to parse API response as CSV', error);
            }
          }
        })
        .catch((error) => {
          setState('failed');
          console.warn(`Error fetching ${url}`);
        });
    }
  }
  return { state, data };
}

export default useAPI;
