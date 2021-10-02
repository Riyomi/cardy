import styles from './Progress.module.scss';

const Progress = ({ progress, style }) => (
  <div className={styles.wrapper} style={style}>
    <div className={styles.progress} style={{ width: `${progress}%` }}></div>
  </div>
);
export default Progress;
