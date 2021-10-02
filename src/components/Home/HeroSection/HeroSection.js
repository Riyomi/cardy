import { Link } from 'react-router-dom';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>
        <h1>Learn once</h1>
        <h1>Remember forever</h1>
        <p>
          Cardy helps you learn more efficiently by the power of Spaced
          Repetition
        </p>
        <Link to="/signup">Get Started</Link>
      </div>
      <div className={styles.img}></div>
    </div>
  );
};

export default HeroSection;
