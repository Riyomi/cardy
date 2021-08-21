import { ReactComponent as QuotationMarks } from '../../assets/quotation-marks.svg';

const Testimonial = ({ img, name, description }) => {
  return (
    <div className="testimonial">
      <QuotationMarks />
      <div className="testimonial-description">{description}</div>
      <div className="testimonial-bottom"></div>
    </div>
  );
};

export default Testimonial;
