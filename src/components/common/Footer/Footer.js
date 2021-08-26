const Footer = ({ brand, copyright }) => {
  return (
    <footer>
      <span className="brand">{brand}</span>
      <span className="spacer"></span>
      <span>{copyright}</span>
    </footer>
  );
};

export default Footer;
