import styles from './qrrouter.module.scss';

/* eslint-disable-next-line */
export interface QrrouterProps {}

export function Qrrouter(props: QrrouterProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Qrrouter!</h1>
    </div>
  );
}

export default Qrrouter;
