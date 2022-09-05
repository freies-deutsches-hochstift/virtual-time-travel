import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // type State = 'not-ready' | 'loading' | 'granted' | 'unavailable';
  const dataMode = process.env?.['NX_DATA_MODE'];
  const apiRoot = process.env?.['NX_API_ROOT'];
  const apiToken = process.env?.['NX_API_TOKEN'];

  // const [state, setState] = useState()

  // TODO Should these be in a config file? This is probably too app specific
  const urlFences = `${apiRoot}/items/berlin_parks_fences?access_token=${apiToken}`;
  const urlPOVs = `${apiRoot}/items/berlin_park_povs?access_token=${apiToken}`;
  const urlPOVPages = `${apiRoot}/items/berlin_park_pov_pages?access_token=${apiToken}`;

  const [fences, setFences] = useState<object | undefined>();
  const [POVs, setPOVs] = useState<object | undefined>();
  const [pages, setPages] = useState<object | undefined>();

  if (!fences) {
    console.log('urlFences', urlFences);
    fetch(urlFences)
      .then((response) => {
        return response.json();
      })
      .then((data) => setFences(data))
      .catch((error) =>
        console.warn('Error loading database entry for fences')
      );
  }

  if (!POVs) {
    console.log('urlFences', urlPOVs);
    fetch(urlFences)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPOVs(data))
      .catch((error) => console.warn('Error loading database entry for POVs'));
  }

  if (!pages) {
    console.log('urlFences', urlPOVPages);
    fetch(urlFences)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPages(data))
      .catch((error) => console.warn('Error loading database entry for pages'));
  }

  return { dataMode, fences, POVs, pages };
}

export default useData;
