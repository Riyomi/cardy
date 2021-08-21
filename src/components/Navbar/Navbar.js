import { Link } from 'react-router-dom';

const Navbar = ({ brand }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        {brand}
      </Link>
      <span className="spacer"></span>
      <div className="menu-items">
        <Link to="/decks">Decks</Link>
        <Link to="/login">Sign up</Link>
        <Link to="/login">Log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
