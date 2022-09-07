/* eslint-disable @typescript-eslint/no-explicit-any */
import useAPI from './api/api';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // TODO move to config library
  const dataMode = process.env?.['NX_DATA_MODE'] as 'json' | 'csv';
  const apiRoot = process.env?.['NX_API_ROOT'] as string;
  const apiToken = process.env?.['NX_API_TOKEN'] as string;
  console.log('apiRoot', apiRoot);

  const fenceTemplate = {
    id: 'id',
    status: 'status',
    sort: 'sort',
    fence: { type: 'fence.type', coordinates: 'fence.coordinates' },
  };
  const povsTemplate = {
    id: 'id',
    status: 'status',
    sort: 'sort',
    title: 'title',
    full_text: 'full_text',
    sub_title: 'sub_title',
    short_text: 'short_text',
    position: { type: 'position.type', coordinates: 'position.coordinates' },
  };

  const fencesDb = useAPI(apiRoot, `items`, {
    endPoint: `berlin_parks_fences`,
    token: apiToken,
    mode: dataMode,
    template: fenceTemplate,
  });
  const povsDb = useAPI(apiRoot, `items`, {
    endPoint: `berlin_parks_povs`,
    token: apiToken,
    mode: dataMode,
    template: povsTemplate,
  });

  return { fences: fencesDb?.data, povs: povsDb.data };
}

export default useData;
