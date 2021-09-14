import { useMutation } from '@apollo/client';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import { useUser } from 'contexts/UserContext';
import { FOLLOW_USER, GET_USER } from 'queries/queries';
import { useState } from 'react';

const ProfileHeader = ({ user }) => {
  const { id, name, img, following, followers, mastered } = user;

  const { userInfo } = useUser();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [follow, { error }] = useMutation(FOLLOW_USER, {
    onError: () => {},
    onCompleted: (data) => {
      setMessage(`${data.followUser} ${name}`);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
    refetchQueries: [
      { query: GET_USER, variables: { id: id } },
      { query: GET_USER, variables: { id: userInfo?.id } },
    ],
  });

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
            <button className="action-btn" disabled>
              Edit profile
            </button>
          ) : (
            <button
              className="action-btn"
              onClick={() => follow({ variables: { userId: id } })}
            >
              {followers.filter((follower) => follower.id === userInfo.id)
                .length
                ? 'Unfollow'
                : 'Follow'}
            </button>
          ))}
      </div>
    </section>
  );
};

export default ProfileHeader;
