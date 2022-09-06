import { useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import useData from './data';

/* eslint-disable-next-line */
export interface DBExampleProps {}

export function DBExample(props: DBExampleProps) {
  const db = useData();

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
          <div>Loaded {db.fences?.length} fences</div>
          <JSONTree data={db.fences} />
        </fieldset>
        <fieldset>
          <legend>POVs DB</legend>
          <div>Loaded {db.povs?.length} povs</div>
          <JSONTree data={db.povs} />
        </fieldset>
        <fieldset>
          <legend>Relationship DB</legend>
          <div>Loaded {db.relationships?.length} povs</div>
          <JSONTree data={db.relationships} />
        </fieldset>
      </fieldset>
    </>
  );
}

export default DBExample;

//berlin_parks_povs_berlin_parks_fences
