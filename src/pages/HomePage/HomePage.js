import Testimonials from '../../components/Testimonials/Testimonials';

const testimonials = [
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
];

const HomePage = () => {
  return (
    <div>
      Hello from Homepage
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default HomePage;
