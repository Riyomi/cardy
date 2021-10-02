import { Link } from 'react-router-dom';
import { deck } from 'types/Deck';
import styles from './DeckListItem.module.scss';

interface Props {
  deck: deck;
}

const DeckListItem = ({ deck }: Props) => {
  const { id, img, title, learners, cards, createdBy } = deck;

  return (
    <Link to={`/deck/${id}`} className={styles.container}>
      <img src={img} alt={title} />
      <div className={styles.details}>
        <div>{title}</div>
        <div>
          <div>
            <div className={styles.iconWrapper}>
              <span className="material-icons-outlined" title="learners">
                people
              </span>
              <span>{learners}</span>
            </div>
            <div className={styles.iconWrapper}>
              <span className="material-icons-outlined" title="cards">
                school
              </span>
              <span>{cards ? cards.length : 0}</span>
            </div>
          </div>
          <span style={{ margin: 'auto 0px' }}>
            By {createdBy && createdBy.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DeckListItem;
