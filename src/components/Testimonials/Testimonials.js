import Testimonial from '../Testimonial/Testimonial';

const Testimonials = ({ testimonials }) => {
  return (
    <div id="testimonials">
      {testimonials.map((testimonial, index) => (
        <Testimonial description={testimonial} key={index} />
      ))}
    </div>
  );
};

export default Testimonials;
