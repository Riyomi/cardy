import { Link } from 'react-router-dom';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';

const DeckPreview = ({ deck }) => {
  return (
    <div className="deck-card" style={{ width: '80%', margin: '15px 0' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <img className="deck-img" src={deck.img} alt={deck.title} />
        <div className="deck-details">
          <Link to={'/deck/' + deck.id} className="deck-title">
            {deck.title}
          </Link>
          <ProgressBar
            progress={0}
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
