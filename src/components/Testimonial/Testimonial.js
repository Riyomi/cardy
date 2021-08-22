import { ReactComponent as QuotationMarks } from '../../assets/quotation-marks.svg';

const Testimonial = ({ img, name, description }) => {
  return (
    <div className="testimonial">
      <QuotationMarks className="quote-mark" />
      <div className="testimonial-description">{description}</div>
      <div className="testimonial-bottom">
        <img src={img} alt={name?.first} className="testimonial-picture" />
        <div>{name?.first + ' ' + name?.last}</div>
      </div>
    </div>
  );
};

export default Testimonial;
