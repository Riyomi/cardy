import { Link } from 'react-router-dom';
import { getUserProgress } from 'utils/utils';

const Follower = ({ follower }) => {
  const { id, name, img, experience } = follower;

  return (
    <Link className="follower" to={`/profile/${id}`}>
      <div className="follower-details">
        <img src={img} alt={name} />
        <span className="level-badge">{getUserProgress(experience).level}</span>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default Follower;
