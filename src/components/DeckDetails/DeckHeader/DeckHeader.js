import { Link } from 'react-router-dom';

const DeckHeader = ({ deck }) => {
  const { id, title, img, publicId, cards, learners, createdBy } = deck;

  return (
    <div id="deck-header">
      <img src={img} alt={title} />
      <div id="deck-header-info">
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
              <span className="material-icons-outlined">school</span>
              <span>{cards ? cards.length : 0} cards</span>
            </span>
            <span>
              <span className="material-icons-outlined">people</span>
              <span>{learners} learners</span>
            </span>
          </div>
          <Link id="created-by" to={`/profile/${createdBy.id}`}>
            by {createdBy.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
