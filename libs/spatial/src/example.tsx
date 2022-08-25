import { Spatial } from './lib/spatial';
import styles from './example.module.scss';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface SpatialExampleProps {}

export function SpatialExample(props: SpatialExampleProps) {
  const spatial = useRef(new Spatial());
  useEffect(() => {
    spatial.current.requestOrientation();
  }, []);

  return <div>spatial</div>;
}

export default SpatialExample;
