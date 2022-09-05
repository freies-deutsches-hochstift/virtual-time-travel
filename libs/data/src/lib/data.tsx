import styles from './data.module.scss';

/* eslint-disable-next-line */
export interface DataProps {}

export function Data(props: DataProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Data!</h1>
    </div>
  );
}

export default Data;
