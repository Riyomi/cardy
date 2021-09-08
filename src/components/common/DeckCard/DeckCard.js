import { useMutation } from '@apollo/client';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import { COPY_DECK, GET_DECK, GET_USER, QUIT_DECK } from 'queries/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DeckCard = ({ deck, location }) => {
  const { userInfo } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const [quitDeck] = useMutation(QUIT_DECK, {
    onCompleted: () => console.log('deleted ' + deck.title),
    refetchQueries: [{ query: GET_USER, variables: { id: userInfo?.id } }],
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
    copyDeck({ variables: { id: deck.id } }).catch((err) => console.log(err));
  };

  return (
    <>
      {location === 'dashboard' && (
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
              {location === 'dashboard' && (
                <span id="cards-learned">
                  0 / {deck.cards ? deck.cards.length : 0} cards
                </span>
              )}
              <ProgressBar
                progress={0}
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
            <button id="review-btn">Review (0)</button>
          </div>
        </div>
      )}
      {location === 'details' && (
        <div id="deck-details-card" className="deck-card">
          <div>
            0 / {deck.cards ? deck.cards.length : 0} cards learned (0 mastered)
          </div>
          <ProgressBar progress={0} styles={{ margin: '10px 0' }} />
          <div id="deck-bottom">
            {userInfo?.id === deck.user.id && (
              <span id="deck-options" onClick={() => setOpenMenu(!openMenu)}>
                <span className="material-icons-outlined">expand_more</span>
                <span>Options</span>
                {openMenu && (
                  <div id="options-menu">
                    <span>
                      <span className="material-icons-outlined">
                        restart_alt
                      </span>
                      <span>Reset</span>
                    </span>
                    <span>
                      <span className="material-icons-outlined">delete</span>
                      <span>Delete</span>
                    </span>
                  </div>
                )}
              </span>
            )}
            {deck.user.id !== userInfo?.id && (
              <button id="review-btn" onClick={handleCopy}>
                Start studying
              </button>
            )}
            {deck.user.id === userInfo?.id && (
              <button id="review-btn">Review</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeckCard;
