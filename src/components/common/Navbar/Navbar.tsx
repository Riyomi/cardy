import { useUser } from 'contexts/UserContext';
import { Link } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { userInfo, setUserInfo } = useUser();
  return (
    <nav>
      <Link to="/" className="brand">
        cardy
      </Link>
      <span className="spacer"></span>
      {userInfo ? (
        <div>
          <Link to="/dashboard" className={styles.dashboard}>
            dashboard
          </Link>
          <Link to="/browse">decks</Link>
          <UserDropdown user={userInfo} setUserInfo={setUserInfo} />
        </div>
      ) : (
        <div>
          <Link to="/signup">sign up</Link>
          <Link to="/login">log in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
