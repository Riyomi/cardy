import { Link } from 'react-router-dom';
import { getUserProgress } from 'utils/utils';
import styles from './Follower.module.scss';
import { user } from 'types/User';

interface Props {
  follower: user;
}

const Follower = ({ follower }: Props): JSX.Element => {
  const { id, name, img, experience } = follower;

  return (
    <Link className={styles.container} to={`/profile/${id}`}>
      <div className={styles.details}>
        <img src={img} alt={name} />
        <span className={styles.badge}>
          {getUserProgress(experience).level}
        </span>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default Follower;
