import DeckListItem from '../DeckListItem/DeckListItem';
import styles from './DeckList.module.scss';

const DeckList = ({ decks, limit, setLimit }) => {
  return (
    <>
      <div className={styles.container}>
        {decks && decks.length ? (
          decks
            .slice(0, limit)
            .map((deck, index) => <DeckListItem deck={deck} key={index} />)
        ) : (
          <p>No match.</p>
        )}
      </div>

      {limit < decks.length && (
        <button onClick={() => setLimit(limit + 6)}>Load More...</button>
      )}
    </>
  );
};

export default DeckList;
