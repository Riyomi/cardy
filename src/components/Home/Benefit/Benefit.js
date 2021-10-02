import styles from './Benefit.module.scss';

const Benefit = ({ icon, title, description }) => (
  <div className={styles.card}>
    <span className="material-icons-outlined">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
export default Benefit;
