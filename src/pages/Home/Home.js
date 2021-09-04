import HeroSection from 'components/Home/HeroSection/HeroSection';
import Benefits from 'components/Home/Benefits/Benefits';
import Testimonials from 'components/Home/Testimonials/Testimonials';
import { useUser } from 'contexts/UserContext';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const { userInfo } = useUser();

  if (userInfo) return <Redirect to="/dashboard" />;

  return (
    <>
      <HeroSection />
      <Benefits />
      <Testimonials />
    </>
  );
};

export default Home;
