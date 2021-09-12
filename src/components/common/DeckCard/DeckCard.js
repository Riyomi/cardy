import { useMutation } from '@apollo/client';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import {
  GET_DECK,
  GET_DECKS,
  GET_USER,
  COPY_DECK,
  QUIT_DECK,
} from 'queries/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cardsDueTo, getDeckProgression, getSeenCards } from 'utils/utils';
import { useHistory } from 'react-router-dom';

const DeckCard = ({ deck }) => {
  const { userInfo } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const [quitDeck] = useMutation(QUIT_DECK, {
    refetchQueries: [
      { query: GET_USER, variables: { id: userInfo?.id } },
      { query: GET_DECK, variables: { id: deck.publicId } },
      { query: GET_DECKS },
    ],
  });

  const [copyDeck] = useMutation(COPY_DECK, {
    refetchQueries: [
      { query: GET_USER, variables: { id: userInfo?.id } },
      { query: GET_DECK, variables: { id: deck.id } },
    ],
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      quitDeck({ variables: { id: deck.id } }).catch((err) => console.log(err));
    }
  };

  const handleCopy = () => {
    if (!userInfo) return history.push('/login');

    copyDeck({ variables: { id: deck.publicId ? deck.publicId : deck.id } })
      .then((res) => {
        history.push('/deck/' + res.data.copyDeck.id);
      })
      .catch((err) => console.log(err));
  };

  const DeckOptions = () => {
    const cards = cardsDueTo(deck.cards);
    return (
      <>
        <span id="deck-options" onClick={() => setOpenMenu(!openMenu)}>
          <span className="material-icons-outlined">expand_more</span>
          <span>Options</span>
          {openMenu && (
            <div id="options-menu">
              <span>
                <span className="material-icons-outlined">restart_alt</span>
                <span>Reset</span>
              </span>
              <span onClick={handleDelete}>
                <span className="material-icons-outlined">delete</span>
                <span>Delete</span>
              </span>
            </div>
          )}
        </span>
        {cards.length > 0 ? (
          <button
            id="review-btn"
            onClick={() => history.push('/study', { cards: cards, deck: deck })}
          >
            Review ({cards.length})
          </button>
        ) : (
          <button id="review-btn">Learn new</button>
        )}
      </>
    );
  };

  return (
    <>
      {history.location.pathname === '/dashboard' ? (
        <div
          className="deck-card"
          style={{ width: '90%', display: 'block', margin: '20px 0' }}
        >
          <div style={{ display: 'flex' }}>
            <img className="deck-img" src={deck.img} alt={deck.title} />
            <div className="deck-details">
              <Link to={'/deck/' + deck.id} className="deck-title">
                {deck.title}
              </Link>
              <span id="cards-learned">
                {getSeenCards(deck.cards)} /{' '}
                {deck.cards ? deck.cards.length : 0} cards
              </span>
              <ProgressBar
                progress={getDeckProgression(deck)}
                styles={{
                  marginTop: '5px',
                  width: '100%',
                }}
              />
            </div>
          </div>
          <div
            id="deck-bottom"
            style={{ marginBottom: '-10px', marginTop: '5px' }}
          >
            <DeckOptions />
          </div>
        </div>
      ) : (
        <div id="deck-details-card" className="deck-card">
          <div>
            {getSeenCards(deck.cards)} / {deck.cards ? deck.cards.length : 0}{' '}
            cards learned ({deck.mastered} mastered)
          </div>
          <ProgressBar
            progress={getDeckProgression(deck)}
            styles={{ margin: '10px 0' }}
          />
          <div id="deck-bottom">
            {deck.user.id === userInfo?.id ? (
              <DeckOptions />
            ) : (
              <button id="review-btn" onClick={handleCopy}>
                Start studying
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeckCard;
