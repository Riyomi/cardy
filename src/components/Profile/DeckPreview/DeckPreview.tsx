import { deck } from 'types/Deck';
import { Link } from 'react-router-dom';
import { getDeckProgression } from 'utils/utils';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import styles from './DeckPreview.module.scss';

interface Props {
  deck: deck;
}

const DeckPreview = ({ deck }: Props) => {
  const { id, title, img } = deck;

  return (
    <div className={styles.container}>
      <div>
        <img src={img} alt={title} />
        <div className={styles.details}>
          <Link to={`/deck/${id}`} className={styles.title}>
            {title}
          </Link>
          <ProgressBar
            progress={getDeckProgression(deck)}
            styles={{
              marginTop: '20px',
              width: '90%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeckPreview;
