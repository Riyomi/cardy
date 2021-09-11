import { useEffect, useState } from 'react';
import Testimonial from '../Testimonial/Testimonial';
import axios from 'axios';

const apiEndPoint = 'https://randomuser.me/api';

const testimonials = [
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
];

const Testimonials = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint + '?results=3').then((response) => {
      const data = response.data.results;
      setPeople(data);
    });
  }, []);

  return (
    <section>
      <h2>What our users are saying about us</h2>
      <div id="testimonials">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            description={testimonial}
            key={index}
            img={people[index]?.picture.large}
            name={people[index]?.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
