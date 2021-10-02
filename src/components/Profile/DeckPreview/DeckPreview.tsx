import { deck } from 'types/Deck';
import { Link } from 'react-router-dom';
import { getDeckProgression } from 'utils/utils';
import Progress from 'components/common/Progress/Progress';
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
          <Progress
            progress={getDeckProgression(deck)}
            style={{
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
