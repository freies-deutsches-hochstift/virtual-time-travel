import { useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import useAPI from './api';

/* eslint-disable-next-line */
export interface APIExampleProps {}

export function APIExample(props: APIExampleProps) {
  const demoAPI = useAPI(`https://jsonplaceholder.typicode.com`, `users`);

  useEffect(() => {
    console.log(demoAPI.data);
  }, [demoAPI.data]);

  return (
    <>
      <h1>API Demo </h1>
      <fieldset>
        <legend>Remote Data</legend>
        <div>
          Pulling data from{' '}
          <a href="https://jsonplaceholder.typicode.com">Typicode</a>
        </div>
        <div>State : {demoAPI?.state}</div>
        <JSONTree data={demoAPI.data} />
      </fieldset>
    </>
  );
}
