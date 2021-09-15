import { useUser } from 'contexts/UserContext';
import { Link } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';

const Navbar = () => {
  const { userInfo, setUserInfo } = useUser();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        cardy
      </Link>
      <span className="spacer"></span>
      {userInfo ? (
        <div className="menu-items">
          <Link to="/dashboard">dashboard</Link>
          <Link to="/browse">decks</Link>
          <UserDropdown user={userInfo} setUserInfo={setUserInfo} />
        </div>
      ) : (
        <div className="menu-items">
          <Link to="/signup">sign up</Link>
          <Link to="/login">log in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
