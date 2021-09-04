import { Link } from 'react-router-dom';

const Follower = ({ follower }) => {
  console.log(follower);
  return (
    <Link className="follower" to={'/profile/' + follower.id}>
      <div className="follower-details">
        <img src={follower.img} alt={follower.name} />
        <span>{follower.name}</span>
      </div>
      <button>Follow</button>
    </Link>
  );
};

export default Follower;
