import styles from './csvtojson.module.scss';

/* eslint-disable-next-line */
export interface CsvtojsonProps {}

export function Csvtojson(props: CsvtojsonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Csvtojson!</h1>
    </div>
  );
}

export default Csvtojson;
