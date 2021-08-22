import { Link } from 'react-router-dom';

const Navbar = ({ brand }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        {brand}
      </Link>
      <span className="spacer"></span>
      <div className="menu-items">
        <Link to="/decks">decks</Link>
        <Link to="/signup">sign up</Link>
        <Link to="/login">log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
