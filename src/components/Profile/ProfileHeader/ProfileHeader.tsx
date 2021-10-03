import { useMutation } from '@apollo/client';
import Popup from 'components/common/Popup/Popup';
import { useUser } from 'contexts/UserContext';
import { FOLLOW_USER, GET_USER } from 'queries/queries';
import { useState } from 'react';
import { user } from 'types/User';
import styles from './ProfileHeader.module.scss';

interface Props {
  user: user;
}

const ProfileHeader = ({ user }: Props) => {
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
    <section className={styles.wrapper}>
      {error && <Popup message={error.message} type="error" />}
      {success && <Popup message={message} type="success" />}
      <div className={styles.user}>
        <img src={img} alt={name} />
        <div className={styles.userDetails}>
          <h2>{name}</h2>
          <p>
            <span className="material-icons-outlined">people</span>
            <span>
              {following.length} Following / {followers.length} Followers
            </span>
          </p>
          <p>
            <span className="material-icons-outlined">school</span>
            <span>{mastered} cards mastered</span>
          </p>
        </div>
      </div>
      <div>
        {userInfo &&
          (userInfo.id === id ? (
            <button className={styles.btn} disabled>
              Edit profile
            </button>
          ) : (
            <button
              className={styles.btn}
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
