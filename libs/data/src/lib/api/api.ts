import { parse } from 'csv-parse/browser/esm/sync';
import { useState } from 'react';

export interface useAPIProps {
  root: string;
  api: string;
  endPoint?: string;
  token?: string;
  tokenFormat?: string;
}

export function useAPI(
  root: string,
  api: string,
  endPoint?: string,
  token?: string,
  tokenFormat = `?access_token=`
) {
  let url = `${root}/${api}`;
  if (endPoint) {
    url += `/${endPoint}`;
  }
  if (token) {
    url += `${tokenFormat}${token}`;
  }
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'failed'>(
    'idle'
  );

  // TODO move to config library
  const dataMode = 'csv'; //process.env?.['NX_DATA_MODE'];

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
          if (dataMode === 'json') {
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
          if (dataMode === 'csv') {
            try {
              const csv = parse(data, { columns: true });
              for (let i = 0; i < Object.keys(csv[0]).length; i++) {
                const key = Object.keys(csv[0])[i];
                console.log('key', key);
              }
              setData(csv);
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
