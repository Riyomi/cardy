import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div id="hero-wrapper">
      <div id="hero-text">
        <h1>Learn once</h1>
        <h1>Remember forever</h1>
        <p>
          Cardy helps you learn more efficiently by the power of Spaced
          Repetition
        </p>
        <Link to="/signup" id="hero-btn">
          Get Started
        </Link>
      </div>
      <div id="hero-img"></div>
    </div>
  );
};

export default HeroSection;
