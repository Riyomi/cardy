import DeckCard from 'components/common/DeckCard/DeckCard';

const DeckBody = ({ deck }) => {
  return (
    <div id="deck-body">
      <DeckCard deck={deck} location="details" />
      <div id="card-distribution">Card distribution graph</div>
      <div id="review-forecast">Review forecast graph</div>
    </div>
  );
};

export default DeckBody;
