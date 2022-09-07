/* eslint-disable @typescript-eslint/no-explicit-any */
import useAPI from './api/api';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // TODO move to config library
  const apiRoot = process.env?.['NX_API_ROOT'] as string;
  const apiToken = process.env?.['NX_API_TOKEN'];
  console.log('apiRoot', apiRoot);

  const fencesDb = useAPI(apiRoot, `items`, `berlin_parks_fences`, apiToken);
  const povsDb = useAPI(apiRoot, `items`, `berlin_parks_povs`, apiToken);

  return { fences: fencesDb?.data, povs: povsDb.data };
}

export default useData;
