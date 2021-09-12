import { Link } from 'react-router-dom';
import { getUserProgress } from 'utils/utils';

const Follower = ({ follower }) => {
  return (
    <Link className="follower" to={'/profile/' + follower.id}>
      <div className="follower-details">
        <img src={follower.img} alt={follower.name} />
        <span className="level-badge">
          {getUserProgress(follower.experience).level}
        </span>
        <span>{follower.name}</span>
      </div>
    </Link>
  );
};

export default Follower;
