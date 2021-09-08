import { useState } from 'react';
import Follower from '../Follower/Follower';

const Followers = ({ followers, following, style }) => {
  const [showFollowers, setShowFollowers] = useState(true);

  return (
    <div className="followers" style={style}>
      <div className="followers-header">
        <span
          className={showFollowers ? 'active' : ''}
          onClick={() => setShowFollowers(true)}
        >
          Followers
        </span>
        <span
          className={!showFollowers ? 'active' : ''}
          onClick={() => setShowFollowers(false)}
        >
          Following
        </span>
      </div>
      <div className="followers-content">
        {showFollowers ? (
          <div>
            {followers.length === 0 ? (
              <p>No followers</p>
            ) : (
              followers.map((follower, index) => (
                <Follower key={index} follower={follower} />
              ))
            )}
          </div>
        ) : (
          <div>
            {following.length === 0 ? (
              <p>This user isn't following anyone yet</p>
            ) : (
              following.map((following, index) => (
                <Follower key={index} follower={following} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
