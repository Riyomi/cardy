import { ReactComponent as QuotationMarks } from 'assets/quotation-marks.svg';
import styles from './Testimonial.module.scss';

const Testimonial = ({ img, name, description }) => {
  return (
    <div className={styles.container}>
      <QuotationMarks className={styles.quote} />
      <div className={styles.description}>{description}</div>
      <div className={styles.bottom}>
        <img src={img} alt={name?.first} />
        <div>{name?.first + ' ' + name?.last}</div>
      </div>
    </div>
  );
};

export default Testimonial;
