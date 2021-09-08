import { Link } from 'react-router-dom';

const DeckHeader = ({ deck }) => {
  return (
    <div id="deck-header">
      <img src={deck.img} alt={deck.title} />
      <div id="deck-header-info">
        <div>
          <h2>
            {deck.title}{' '}
            <span
              style={{ fontSize: '16px' }}
              title="This deck was created based on a shared deck. &#013;Any changes made by the owner of the shared deck will be synchronized. &#013;If you don't want this to happen, you can opt out in the settings."
            >
              {deck.publicId && deck.id !== deck.publicId ? '(synched)' : ''}
            </span>
          </h2>
        </div>
        <div>
          <div>
            <span>
              <span className="material-icons-outlined">school</span>
              <span>{deck.cards ? deck.cards.length : 0} cards</span>
            </span>
            <span>
              <span className="material-icons-outlined">people</span>
              <span>{deck.learners} learners</span>
            </span>
          </div>
          <Link to={'/profile/' + deck.createdBy.id}>
            by {deck.createdBy.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
