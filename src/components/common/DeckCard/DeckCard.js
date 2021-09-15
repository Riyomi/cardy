import { useMutation } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
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
  const history = useHistory();
  const { userInfo } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const { id, publicId, img, title, cards, user, mastered } = deck;

  const refetchQueries = [
    { query: GET_USER, variables: { id: userInfo.id } },
    { query: GET_DECK, variables: { id } },
  ];

  const [resetDeck] = useMutation(RESET_DECK, {
    onError: () => {},
    refetchQueries,
  });

  const [copyDeck] = useMutation(COPY_DECK, {
    onError: () => {},
    onCompleted: (data) => history.push('/deck/' + data.copyDeck.id),
    refetchQueries,
  });

  const [deleteDeck] = useMutation(QUIT_DECK, {
    onError: () => {},
    onCompleted: () => history.push('/dashboard'),
    refetchQueries: [
      { query: GET_USER, variables: { id: userInfo.id } },
      { query: GET_DECK, variables: { id: publicId } },
      { query: GET_BROWSE_DATA },
    ],
  });

  const handleDelete = () =>
    window.confirm('Are you sure you want to delete this deck?') &&
    deleteDeck({ variables: { id } });

  const handleReset = () =>
    window.confirm('Are you sure you want to reset your progress?') &&
    resetDeck({ variables: { id } });

  const DeckOptions = () => {
    const cardsToReview = cardsDueTo(cards);
    const newCards = cards.filter((card) => !card.nextReview).slice(0, 20);
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
        {cardsToReview.length ? (
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
            disabled={!newCards.length}
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
            <img className="deck-img" src={img} alt={title} />
            <div className="deck-details">
              <Link to={'/deck/' + id} className="deck-title">
                {title}
              </Link>
              <span id="cards-learned">
                {getSeenCards(cards)} / {cards ? cards.length : 0} cards
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
            {userInfo.id === user.id ? getSeenCards(cards) : 0} /{' '}
            {cards ? cards.length : 0} cards learned (
            {userInfo.id === user.id ? mastered : 0} mastered)
          </div>
          <ProgressBar
            progress={userInfo.id === user.id ? getDeckProgression(deck) : 0}
            styles={{ margin: '10px 0' }}
          />

          <div id="deck-bottom">
            {user.id === userInfo?.id ? (
              <DeckOptions />
            ) : (
              <button
                id="review-btn"
                onClick={() => copyDeck({ variables: { id: publicId || id } })}
              >
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
