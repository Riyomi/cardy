import ProgressBar from 'components/common/ProgressBar/ProgressBar';

const DeckCard = ({ img, title, progress }) => {
  return (
    <div className="deck-card">
      <img className="deck-img" src={img} alt={title} />
      <div className="deck-details">
        <div className="deck-title">{title}</div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default DeckCard;
