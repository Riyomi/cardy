import { useMutation } from '@apollo/client';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import {
  GET_DECK,
  GET_BROWSE_DATA,
  GET_USER,
  COPY_DECK,
  QUIT_DECK,
  RESET_DECK,
} from 'queries/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cardsDueTo, getDeckProgression, getSeenCards } from 'utils/utils';
import { useHistory } from 'react-router-dom';

const DeckCard = ({ deck }) => {
  const { userInfo } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();

  const resetCopyOptions = {
    refetchQueries: [
      { query: GET_USER, variables: { id: userInfo?.id } },
      { query: GET_DECK, variables: { id: deck.id } },
    ],
  };

  const [resetDeck] = useMutation(RESET_DECK, resetCopyOptions);
  const [copyDeck] = useMutation(COPY_DECK, resetCopyOptions);

  const [quitDeck] = useMutation(QUIT_DECK, {
    refetchQueries: [
      { query: GET_USER, variables: { id: userInfo?.id } },
      { query: GET_DECK, variables: { id: deck.publicId } },
      { query: GET_BROWSE_DATA },
    ],
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      quitDeck({ variables: { id: deck.id } })
        .then(() => history.push('dashboard'))
        .catch((err) => console.log(err));
    }
  };

  const handleCopy = () => {
    if (!userInfo) return history.push('/login');
    const deckId = deck.publicId ? deck.publicId : deck.id;

    copyDeck({ variables: { id: deckId } })
      .then((res) => {
        history.push('/deck/' + res.data.copyDeck.id);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      resetDeck({ variables: { id: deck.id } }).catch((err) =>
        console.log(err)
      );
    }
  };

  const DeckOptions = () => {
    const cardsToReview = cardsDueTo(deck.cards);
    const newCards = deck.cards.filter((card) => !card.nextReview).slice(0, 20);
    return (
      <>
        <span id="deck-options" onClick={() => setOpenMenu(!openMenu)}>
          <span className="material-icons-outlined">expand_more</span>
          <span>Options</span>
          {openMenu && (
            <div id="options-menu">
              <span onClick={handleReset}>
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
        {cardsToReview.length > 0 ? (
          <button
            id="review-btn"
            onClick={() =>
              history.push('/study', { cards: cardsToReview, deck: deck })
            }
          >
            Review ({cardsToReview.length})
          </button>
        ) : (
          <button
            id="review-btn"
            onClick={() =>
              history.push('/study', { cards: newCards, deck: deck })
            }
            disabled={newCards.length === 0}
          >
            Learn new
          </button>
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
            {userInfo && userInfo.id === deck.user.id
              ? getSeenCards(deck.cards)
              : 0}{' '}
            / {deck.cards ? deck.cards.length : 0} cards learned (
            {userInfo && userInfo.id === deck.user.id ? deck.mastered : 0}{' '}
            mastered)
          </div>
          <ProgressBar
            progress={
              userInfo && userInfo.id === deck.user.id
                ? getDeckProgression(deck)
                : 0
            }
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
