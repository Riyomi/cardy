const { Link } = require('react-router-dom');

const UserDropdown = ({ user, setUserInfo }) => {
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <div id="user-dropdown-menu">
      <img src={user.img} alt={user.name} />
      <span className="spacer"></span>
      <span className="material-icons-outlined">expand_more</span>
      <div id="user-dropdown">
        <button className="btn" onClick={() => logout()}>
          Logout
        </button>
        <Link to={'/profile/' + user.id} className="btn">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default UserDropdown;
