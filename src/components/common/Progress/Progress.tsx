import styles from './Progress.module.scss';

interface Props {
  progress: number | string;
  style?: React.CSSProperties;
}

const Progress = ({ progress, style }: Props) => (
  <div className={styles.wrapper} style={style}>
    <div className={styles.progress} style={{ width: `${progress}%` }}></div>
  </div>
);
export default Progress;
