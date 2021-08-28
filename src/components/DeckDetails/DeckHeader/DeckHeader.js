const DeckHeader = ({ deck }) => {
  return (
    <div id="deck-header">
      <img src={deck.img} alt={deck.title} />
      <div id="deck-header-info">
        <h2>{deck.title}</h2>
        <div>
          <div>
            <span>
              <span className="material-icons-outlined">school</span>
              <span>{deck.cards} cards</span>
            </span>
            <span>
              <span className="material-icons-outlined">people</span>
              <span>{deck.learners} learners</span>
            </span>
          </div>
          <span>by {deck.by}</span>
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
