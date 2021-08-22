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
      <div
        style={{
          height: '100%',
          border: '1px solid #aaa',
          borderRadius: '10px',
          display: 'inline-block',
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
