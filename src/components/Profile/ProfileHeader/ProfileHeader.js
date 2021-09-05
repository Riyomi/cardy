import { useMutation } from '@apollo/client';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import { useUser } from 'contexts/UserContext';
import { FOLLOW_USER, UNFOLLOW_USER } from 'queries/queries';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const { userInfo } = useUser();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [followUser, { error }] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const handleFollowUser = async () => {
    if (!userInfo) return history.push('/login');

    try {
      await followUser({
        variables: { userToBeFollowed: user.id },
      });
      setMessage('Followed ' + user.name);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollowUser = async () => {
    if (!userInfo) return history.push('/login');

    try {
      await unfollowUser({
        variables: { userToBeUnfollowed: user.id },
      });
      setMessage('Unfollowed ' + user.name);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="profile-wrapper">
      {error && <PopupMessage message={error.message} type="error" />}
      {success && <PopupMessage message={message} type="success" />}
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
          userInfo.id === user.id ? (
            <button className="action-btn">Edit profile</button>
          ) : user.followers.filter((follower) => follower.id === userInfo.id)
              .length === 1 ? (
            <button className="action-btn" onClick={handleUnfollowUser}>
              Unfollow
            </button>
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
