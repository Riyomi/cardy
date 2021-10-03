import HeroSection from 'components/Home/HeroSection/HeroSection';
import Benefits from 'components/Home/Benefits/Benefits';
import Testimonials from 'components/Home/Testimonials/Testimonials';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Home = () => {
  const history = useHistory();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo) history.push('/dashboard');
  });

  return (
    <>
      <HeroSection />
      <Benefits />
      <Testimonials />
    </>
  );
};

export default Home;
