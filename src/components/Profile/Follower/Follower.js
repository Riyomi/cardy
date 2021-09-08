import { Link } from 'react-router-dom';

const Follower = ({ follower }) => {
  return (
    <Link className="follower" to={'/profile/' + follower.id}>
      <div className="follower-details">
        <img src={follower.img} alt={follower.name} />
        <span>{follower.name}</span>
      </div>
    </Link>
  );
};

export default Follower;
