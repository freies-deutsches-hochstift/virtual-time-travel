import useAPI from './api/api';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // TODO move to config library
  // const dataMode = process.env?.['NX_DATA_MODE'];
  const apiRoot = process.env?.['NX_API_ROOT'] as string;
  const apiToken = process.env?.['NX_API_TOKEN'];

  // TODO Implement cache mode and switch if dataMode is cache

  const fences = useAPI(apiRoot, `items`, `berlin_parks_fences`, apiToken);
  const povs = useAPI(apiRoot, `items`, `berlin_parks_povs`, apiToken);
  const pages = useAPI(apiRoot, `items`, `berlin_parks_pov_pages`, apiToken);

  return { fences, povs, pages };
}

export default useData;
