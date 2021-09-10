const Footer = ({ brand }) => {
  return (
    <footer>
      <span className="brand">{brand}</span>
      <span className="spacer"></span>
      <span>©2021 All rights reserved.</span>
    </footer>
  );
};

export default Footer;
