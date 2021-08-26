const Follower = ({ follower }) => {
  return (
    <div className="follower">
      <div className="follower-details">
        <img src={follower.img} alt={follower.name} />
        <span>{follower.name}</span>
      </div>
      <button>Follow</button>
    </div>
  );
};

export default Follower;
