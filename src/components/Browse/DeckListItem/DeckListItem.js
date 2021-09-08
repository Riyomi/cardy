import { Link } from 'react-router-dom';

const DeckListItem = ({ deck }) => {
  const formatLearners = (learners) => {
    if (learners > 1000) {
      return `${(Math.floor(learners / 100) * 100) / 1000}k`;
    }
    return learners;
  };

  return (
    <Link to={'/deck/' + deck.id} className="deck-list-item">
      <img src={deck.img} alt={deck.title} />
      <div className="deck-info">
        <div className="deck-title">{deck.title}</div>
        <div className="deck-details">
          <div>
            <div className="deck-icon">
              <span className="material-icons-outlined">people</span>
              <span>{formatLearners(deck.learners)}</span>
            </div>
            <div className="deck-icon">
              <span className="material-icons-outlined">schedule</span>
              <span>{deck.cards ? deck.cards.length : 0}</span>
            </div>
          </div>
          <span style={{ margin: 'auto 0px' }}>By {deck.createdBy.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default DeckListItem;
