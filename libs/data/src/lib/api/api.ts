import { useEffect, useState } from 'react';

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
  // TODO Clarify how to parse JSON without any in TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Array<any> | undefined>();

  if (state === 'idle') {
    setState('loading');
    if (!data) {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setState('loaded');
          if (data.data && Object.keys(data).length === 1) {
            setData(data.data);
          } else {
            setData(data);
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
