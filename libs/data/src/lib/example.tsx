import { useEffect } from 'react';
import useData from './data';

/* eslint-disable-next-line */
export interface DBExampleProps {}

export function DBExample(props: DBExampleProps) {
  const db = useData();
  useEffect(() => {
    console.log('data:', db?.fences?.data);
  }, [db]);

  return (
    <>
      <h1>Database Demo </h1>
      <fieldset>
        <legend>Remote Data</legend>
        <div>
          Pulling data from
          <a href="https://directus.geo-ar.drm.meso.design"> Directus</a>
        </div>

        {/* {Object.keys(db).map((key) => {
          const entry = db?.[key as keyof typeof db]; // https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript
          return (
            <div key={key}>
              <div>
                {key[0].toUpperCase() + key.substring(1)} State : {entry?.state}
              </div>
              <div></div>
              <div></div>
            </div>
          );
        })} */}

        <fieldset>
          <legend>Fences DB</legend>
          <div>Fences State : {db?.fences?.state}</div>
          <div>Loaded {db.fences.data?.length} fences</div>
          <ul>
            {db?.fences?.state === 'loaded'
              ? db?.fences?.data?.map((fence, index) => (
                  <li key={index}>
                    {fence?.['id']} : {fence?.['Title']}
                  </li>
                ))
              : ''}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Pages DB</legend>
          <div>Fences State : {db?.pages?.state}</div>
          <div>Loaded {db.pages.data?.length} pages</div>
          <ul>
            {db?.pages?.state === 'loaded'
              ? db?.pages?.data?.map((pages, index) => (
                  <li key={index}>
                    {pages?.['id']} : {pages?.['Title']}
                  </li>
                ))
              : ''}
          </ul>
        </fieldset>
        <fieldset>
          <legend>POVs DB</legend>
          <div>POVs State : {db?.povs?.state}</div>
          <div>Loaded {db.fences.data?.length} povs</div>
          <ul>
            {db?.povs?.state === 'loaded'
              ? db?.povs?.data?.map((pov, index) => (
                  <li key={index}>
                    {pov?.['id']} : {pov?.['Title']}
                  </li>
                ))
              : ''}
          </ul>
        </fieldset>
      </fieldset>
    </>
  );
}

export default DBExample;
