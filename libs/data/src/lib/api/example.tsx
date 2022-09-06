import useAPI from './api';

/* eslint-disable-next-line */
export interface APIExampleProps {}

export function APIExample(props: APIExampleProps) {
  const demoAPI = useAPI(`https://jsonplaceholder.typicode.com`, `users`);

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
        <div> Loaded {demoAPI?.data?.length} users</div>
        <ul>
          {demoAPI?.state === 'loaded'
            ? demoAPI?.data?.map((user) => <li>{user?.['name']}</li>)
            : ''}
        </ul>
      </fieldset>
    </>
  );
}
