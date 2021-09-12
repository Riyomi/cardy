import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from 'queries/queries';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';

import { Link } from 'react-router-dom';
import { getProgress } from 'utils/utils';

const UserDropdown = ({ user, setUserInfo }) => {
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { level, progress } = getProgress(user.experience);

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
      <img src={user.img} alt={user.name} />
      <span className="spacer"></span>
      <span className="material-icons-outlined">expand_more</span>
      <div id="user-dropdown">
        <div id="user-dropdown-user-info">
          <div id="user-picture">
            <img src={user.img} alt={user.name} />
            <span className="level-badge">{level}</span>
          </div>
          <div id="user-name-and-progress">
            <h3>{user.name}</h3>
            <ProgressBar progress={progress} />
          </div>
        </div>
        <div id="user-dropdown-options">
          <Link to={'/profile/' + user.id} className="user-dropdown-option">
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
