import { useMutation } from '@apollo/client';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import { useUser } from 'contexts/UserContext';
import { FOLLOW_USER, GET_USER, UNFOLLOW_USER } from 'queries/queries';
import { useState } from 'react';

const ProfileHeader = ({ user }) => {
  const { id, name, img, following, followers, mastered } = user;

  const { userInfo } = useUser();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const refetchQueries = [
    { query: GET_USER, variables: { id: user.id } },
    { query: GET_USER, variables: { id: userInfo?.id } },
  ];

  const [followUser, { error }] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      setMessage('Followed ' + user.name);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
    refetchQueries,
  });

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    onCompleted: () => {
      setMessage('Unfollowed ' + user.name);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
    refetchQueries,
  });

  const handleFollowUser = () => {
    followUser({
      variables: { userToBeFollowed: user.id },
    }).catch((err) => console.log(err));
  };

  const handleUnfollowUser = () => {
    unfollowUser({
      variables: { userToBeUnfollowed: user.id },
    }).catch((err) => console.log(err));
  };

  return (
    <section className="profile-wrapper">
      {error && <PopupMessage message={error.message} type="error" />}
      {success && <PopupMessage message={message} type="success" />}
      <div className="user-info">
        <img src={img} alt={name} className="profile-picture" />
        <div className="user-details">
          <h2 className="user-name">{name}</h2>
          <p>
            <span className="material-icons-outlined profile-icon">people</span>
            <span className="profile-icon-text">
              {following.length} Following / {followers.length} Followers
            </span>
          </p>
          <p>
            <span className="material-icons-outlined profile-icon">school</span>
            <span className="profile-icon-text">{mastered} cards mastered</span>
          </p>
        </div>
      </div>
      <div>
        {userInfo &&
          (userInfo.id === id ? (
            <button className="action-btn">Edit profile</button>
          ) : followers.filter((follower) => follower.id === userInfo.id)
              .length === 1 ? (
            <button className="action-btn" onClick={handleUnfollowUser}>
              Unfollow
            </button>
          ) : (
            <button className="action-btn" onClick={handleFollowUser}>
              Follow
            </button>
          ))}
      </div>
    </section>
  );
};

export default ProfileHeader;
