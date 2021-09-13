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
            {followers && followers.length ? (
              followers.map((follower, index) => (
                <Follower key={index} follower={follower} />
              ))
            ) : (
              <p>No followers</p>
            )}
          </div>
        ) : (
          <div>
            {following && following.length ? (
              following.map((following, index) => (
                <Follower key={index} follower={following} />
              ))
            ) : (
              <p>This user isn't following anyone yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
