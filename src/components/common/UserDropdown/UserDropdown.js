import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from 'queries/queries';
import { Link } from 'react-router-dom';
import { getUserProgress } from 'utils/utils';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';

const UserDropdown = ({ user, setUserInfo }) => {
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { level, progress } = getUserProgress(user.experience);

  const { id, name, img } = user;

  const logout = async () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires');
    setUserInfo(null);

    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="user-dropdown-menu">
      <img src={img} alt={name} />
      <span className="spacer"></span>
      <span className="material-icons-outlined">expand_more</span>
      <div id="user-dropdown">
        <div id="user-dropdown-user-info">
          <div id="user-picture">
            <img src={img} alt={name} />
            <span className="level-badge">{level}</span>
          </div>
          <div id="user-name-and-progress">
            <h3>{name}</h3>
            <ProgressBar progress={progress} />
          </div>
        </div>
        <div id="user-dropdown-options">
          <Link to={`/profile/${id}`} className="user-dropdown-option">
            <span className="material-icons">account_circle</span>
            <span>Profile</span>
          </Link>
          <Link to="/" className="user-dropdown-option">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </Link>
          <div onClick={() => logout()} className="user-dropdown-option">
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
