import { ReactComponent as QuotationMarks } from 'assets/quotation-marks.svg';
import styles from './Testimonial.module.scss';

interface Props {
  img: string;
  name:
    | {
        first: string;
        last: string;
      }
    | undefined;
  description: string;
}

const Testimonial = ({ img, name, description }: Props) => {
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
