/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import useAPI from './api/api';

/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // TODO move to config library
  // const dataMode = process.env?.['NX_DATA_MODE'];
  const apiRoot = process.env?.['NX_API_ROOT'] as string;
  const apiToken = process.env?.['NX_API_TOKEN'];

  // TODO Implement cache mode and switch if dataMode is cache
  const fencesDb = useAPI(apiRoot, `items`, `berlin_parks_fences`, apiToken);
  const povsDb = useAPI(apiRoot, `items`, `berlin_parks_povs`, apiToken);
  const relationshipsDb = useAPI(
    apiRoot,
    `items`,
    `berlin_parks_povs_berlin_parks_fences`,
    apiToken
  );

  const [fences, setFences] = useState<Array<any> | undefined>();
  const [povs, setPovs] = useState<Array<any> | undefined>();

  useEffect(() => {
    // TODO If module was to be more generic this should be a function populateRelationships()
    if (fencesDb.data && povsDb.data && relationshipsDb.data) {
      console.warn('Doing relationship calculation');

      //Populate fences with relationship references
      const fencesWithRelation = [] as any;
      for (let i = 0; i < fencesDb.data.length; i++) {
        const fence = fencesDb.data[i];
        const relationships = [];
        for (let j = 0; j < relationshipsDb.data.length; j++) {
          const relationship = relationshipsDb.data[j];
          if (fence.id === relationship.berlin_parks_fences_id) {
            relationships.push(relationship.berlin_parks_povs_id);
          }
        }
        fencesWithRelation.push({ ...fence, relatedPovs: relationships });
      }
      setFences(fencesWithRelation);

      //Populate povs with relationship references
      const povsWithRelation = [] as any;
      for (let i = 0; i < povsDb.data.length; i++) {
        const pov = povsDb.data[i];
        const relationships = [];
        for (let j = 0; j < relationshipsDb.data.length; j++) {
          const relationship = relationshipsDb.data[j];
          if (pov.id === relationship.berlin_parks_povs_id) {
            relationships.push(relationship.berlin_parks_fences_id);
          }
        }
        povsWithRelation.push({ ...pov, relatedParks: relationships });
      }

      setPovs(povsWithRelation);
    }
  }, [fencesDb.data, povsDb.data, relationshipsDb.data]);

  return { fences, povs };
}

export default useData;
