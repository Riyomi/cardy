import { Link } from 'react-router-dom';
import { getDeckProgression } from 'utils/utils';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';

const DeckPreview = ({ deck }) => {
  const { id, title, img } = deck;

  return (
    <div className="deck-card" style={{ width: '80%', margin: '15px 0' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <img className="deck-img" src={img} alt={title} />
        <div className="deck-details">
          <Link to={`/deck/${id}`} className="deck-title">
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
