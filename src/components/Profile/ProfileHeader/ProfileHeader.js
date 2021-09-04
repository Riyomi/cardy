import { useMutation } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import { FOLLOW_USER } from 'queries/queries';
import { useHistory } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const { userInfo } = useUser();
  const [followUser] = useMutation(FOLLOW_USER);
  const history = useHistory();

  const handleFollowUser = async () => {
    if (!userInfo) return history.push('/login');

    try {
      await followUser({
        variables: { followerId: userInfo.user.id, followingId: user.id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="profile-wrapper">
      <div className="user-info">
        <img src={user.img} alt={user.name} className="profile-picture" />
        <div className="user-details">
          <h2 className="user-name">{user.name}</h2>
          <p>
            <span className="material-icons-outlined profile-icon">people</span>
            <span className="profile-icon-text">
              {user.following.length} Following / {user.followers.length}{' '}
              Followers
            </span>
          </p>
          <p>
            <span className="material-icons-outlined profile-icon">school</span>
            <span className="profile-icon-text">0 cards mastered</span>
          </p>
        </div>
      </div>
      <div>
        {userInfo ? (
          userInfo.user.id === user.id ? (
            <button className="action-btn">Edit profile</button>
          ) : userInfo.user.following.filter(
              (following) => following.id === user.id
            ).length === 1 ? (
            <button className="action-btn">Unfollow</button>
          ) : (
            <button className="action-btn" onClick={handleFollowUser}>
              Follow
            </button>
          )
        ) : (
          <button className="action-btn" onClick={handleFollowUser}>
            Follow
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
