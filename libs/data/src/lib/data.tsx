/* eslint-disable @typescript-eslint/no-explicit-any */
import useAPI from './api/api';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // TODO move to config library
  const dataMode = process.env?.['NX_DATA_MODE'] as 'json' | 'csv';
  const apiRoot = process.env?.['NX_API_ROOT'] as string;
  const apiToken = process.env?.['NX_API_TOKEN'] as string;

  const fenceMapper = (data: any) => {
    return {
      id: data.id,
      status: data.status,
      sort: data.sort,
      fence: {
        type: data['fence.type'],
        coordinates: JSON.parse(data['fence.coordinates']),
      },
    };
  };

  const povsMapper = (data: any) => {
    return {
      id: data.id,
      status: data.status,
      sort: data.sort,
      title: data.title,
      full_text: data.full_text,
      sub_title: data.sub_title,
      short_text: data.short_text,
      position: {
        type: data['position.type'],
        coordinates: JSON.parse(data['position.coordinates']),
      },
    };
  };

  const fencesDb = useAPI(apiRoot, `items`, {
    endPoint: `fences`,
    token: apiToken,
    mode: dataMode,
    mapper: fenceMapper,
  });
  const povsDb = useAPI(apiRoot, `items`, {
    endPoint: `povs`,
    token: apiToken,
    mode: dataMode,
    mapper: povsMapper,
  });

  return { fences: fencesDb?.data, povs: povsDb.data };
}

export default useData;
