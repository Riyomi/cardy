import { CSSProperties, useState } from 'react';
import { follower } from 'types/Follower';
import Follower from '../Follower/Follower';
import styles from './Followers.module.scss';

interface Props {
  followers: follower[];
  following: follower[];
  style?: CSSProperties;
}

const Followers = ({ followers, following, style }: Props) => {
  const [showFollowers, setShowFollowers] = useState(true);

  return (
    <div className={styles.container} style={style}>
      <div className={styles.header}>
        <span
          className={showFollowers ? styles.active : ''}
          onClick={() => setShowFollowers(true)}
        >
          Followers
        </span>
        <span
          className={!showFollowers ? styles.active : ''}
          onClick={() => setShowFollowers(false)}
        >
          Following
        </span>
      </div>
      <div className={styles.content}>
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
