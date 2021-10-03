import { Link } from 'react-router-dom';
import { deck } from 'types/Deck';
import styles from './DeckHeader.module.scss';

interface Props {
  deck: deck;
}

const DeckHeader = ({ deck }: Props) => {
  const { id, title, img, publicId, cards, learners, createdBy } = deck;

  return (
    <div className={styles.wrapper}>
      <img src={img} alt={title} />
      <div className={styles.details}>
        <div>
          <h2>
            {title}{' '}
            <span
              style={{ fontSize: '16px' }}
              title="This deck was created based on a shared deck. &#013;Any changes made by the owner of the shared deck will be synchronized. &#013;If you don't want this to happen, you can opt out in the settings."
            >
              {publicId && id !== publicId ? '(synched)' : ''}
            </span>
          </h2>
        </div>
        <div>
          <div>
            <span>
              <span className={`material-icons-outlined ${styles.icon}`}>
                school
              </span>
              <span>{cards ? cards.length : 0} cards</span>
            </span>
            <span>
              <span className={`material-icons-outlined ${styles.icon}`}>
                people
              </span>
              <span>{learners} learners</span>
            </span>
          </div>
          <Link to={`/profile/${createdBy.id}`}>by {createdBy.name}</Link>
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
