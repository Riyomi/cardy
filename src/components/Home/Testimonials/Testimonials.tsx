import { useEffect, useState } from 'react';
import Testimonial from '../Testimonial/Testimonial';
import axios from 'axios';
import styles from './Testimonials.module.scss';

const testimonials = [
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
  "My grades have skyrocketed since I'm using Cardy. I couldn't be more grateful this app exists!",
];

type person = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

const Testimonials = () => {
  const [people, setPeople] = useState<person[]>([]);

  useEffect(() => {
    const testimonials = localStorage.getItem('testimonials');
    if (testimonials) {
      setPeople(JSON.parse(testimonials));
    } else {
      axios.get('https://randomuser.me/api?results=3').then((response) => {
        const data = response.data.results;
        localStorage.setItem('testimonials', JSON.stringify(data));
        setPeople(data);
      });
    }
  }, []);

  return (
    <section>
      <h2>What our users are saying about us</h2>
      <div className={styles.testimonials}>
        {people.length &&
          testimonials.map((testimonial, index) => (
            <Testimonial
              description={testimonial}
              key={index}
              img={people[index].picture.large}
              name={people[index].name}
            />
          ))}
      </div>
    </section>
  );
};

export default Testimonials;
