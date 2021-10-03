import styles from './Benefit.module.scss';

interface Props {
  icon: string;
  title: string;
  description: string;
}

const Benefit = ({ icon, title, description }: Props) => (
  <div className={styles.card}>
    <span className="material-icons-outlined">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
export default Benefit;
