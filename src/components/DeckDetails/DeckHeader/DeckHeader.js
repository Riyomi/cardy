const DeckHeader = ({ deck }) => {
  return (
    <div id="deck-header">
      <img
        src={deck.img ? deck.img : 'https://via.placeholder.com/200x133'}
        alt={deck.title}
      />
      <div id="deck-header-info">
        <h2>{deck.title}</h2>
        <div>
          <div>
            <span>
              <span className="material-icons-outlined">school</span>
              <span>{deck.cards ? deck.cards.length : 0} cards</span>
            </span>
            <span>
              <span className="material-icons-outlined">people</span>
              <span>{deck.learners ? deck.learners.length : 0} learners</span>
            </span>
          </div>
          <span>by {deck.createdBy.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
