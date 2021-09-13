import { useState } from 'react';
import DeckListItem from '../DeckListItem/DeckListItem';

const DeckList = ({ decks }) => {
  const [limit, setLimit] = useState(6);

  return (
    <>
      {decks.length > 0 ? (
        <div id="deck-list">
          {decks.slice(0, limit).map((deck, index) => (
            <DeckListItem deck={deck} key={index} />
          ))}
        </div>
      ) : (
        <p>No match.</p>
      )}
      {limit < decks.length && (
        <button className="load-more-btn" onClick={() => setLimit(limit + 6)}>
          Load More...
        </button>
      )}
    </>
  );
};

export default DeckList;
