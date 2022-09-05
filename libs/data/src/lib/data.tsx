/* eslint-disable-next-line */
export interface useDataProps {}

export function useData(props?: useDataProps) {
  // type State = 'not-ready' | 'loading' | 'granted' | 'unavailable';
  const dataMode = process.env?.['NX_DATA_MODE'];

  // const [state, setState] = useState()

  return { dataMode };
}

export default useData;
