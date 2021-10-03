import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from 'queries/queries';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getUserProgress } from 'utils/utils';
import Progress from 'components/common/Progress/Progress';
import styles from './UserDropdown.module.scss';
import { UserInfo } from '../../../contexts/UserContext';

interface Props {
  user: UserInfo;
  setUserInfo: Function;
}

const UserDropdown = ({ user, setUserInfo }: Props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires');
    history.push('/');
    setUserInfo(null);
  };

  const [logoutUser] = useMutation(LOGOUT_USER, {
    onError: () => logout(),
    onCompleted: () => logout(),
  });

  const { level, progress } = getUserProgress(user.experience);
  const { id, name, img } = user;

  return (
    <div className={styles.menu}>
      <img src={img} alt={name} />
      <span className="spacer"></span>
      <span className="material-icons-outlined">expand_more</span>
      <div className={styles.dropdown}>
        <div className={styles.userInfo}>
          <div className={styles.picWrapper}>
            <img src={img} alt={name} />
            <span>{level}</span>
          </div>
          <div>
            <h3>{name}</h3>
            <Progress progress={progress} />
          </div>
        </div>
        <div className={styles.options}>
          <Link to={`/profile/${id}`}>
            <span className="material-icons">account_circle</span>
            <span>Profile</span>
          </Link>
          <Link to="/dashboard">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </Link>
          <div onClick={() => logoutUser()}>
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
