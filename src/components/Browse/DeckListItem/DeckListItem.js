import { Link } from 'react-router-dom';

const DeckListItem = ({ deck }) => {
  const { id, img, title, learners, cards, createdBy } = deck;

  return (
    <Link to={'/deck/' + id} className="deck-list-item">
      <img src={img} alt={title} />
      <div className="deck-info">
        <div className="deck-title">{title}</div>
        <div className="deck-details">
          <div>
            <div className="deck-icon">
              <span className="material-icons-outlined">people</span>
              <span>{learners}</span>
            </div>
            <div className="deck-icon">
              <span className="material-icons-outlined">schedule</span>
              <span>{cards ? cards.length : 0}</span>
            </div>
          </div>
          <span style={{ margin: 'auto 0px' }}>By {createdBy.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default DeckListItem;
