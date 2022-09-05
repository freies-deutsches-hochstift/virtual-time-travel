import useData from './lib/data';

/* eslint-disable-next-line */
export interface DataExampleProps {}

export function DataExample(props: DataExampleProps) {
  const data = useData();
  return (
    <>
      <h1>Data Demo</h1>
      <fieldset>
        <legend>Remote Data</legend>
        <div>
          Data mode is set to <b>{data.dataMode}</b> in the .env file
        </div>
        <div>{JSON.stringify(data?.fences)}</div>
      </fieldset>
    </>
  );
}
