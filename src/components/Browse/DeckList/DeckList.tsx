import { deck } from 'types/Deck';
import DeckListItem from '../DeckListItem/DeckListItem';
import styles from './DeckList.module.scss';

interface Props {
  decks: deck[];
  limit: number;
  setLimit: Function;
}

const DeckList = ({ decks, limit, setLimit }: Props) => {
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
