import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useState } from 'react';

const DeckCard = ({ deck, location }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {(location === 'profile' || location === 'dashboard') && (
        <div
          id="deck-profile-card"
          className="deck-card"
          style={{ width: location === 'dashboard' ? '90%' : '80%' }}
        >
          <div style={{ display: 'flex' }}>
            <img className="deck-img" src={deck.img} alt={deck.title} />
            <div className="deck-details">
              <div className="deck-title">{deck.title}</div>
              {location === 'dashboard' && (
                <span id="cards-learned">154 / 2000 cards</span>
              )}
              <ProgressBar
                progress={deck.progress}
                styles={{
                  marginTop: location === 'dashboard' ? '5px' : '20px',
                  width: location === 'dashboard' ? '100%' : '90%',
                }}
              />
            </div>
          </div>
          {location === 'dashboard' && (
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
                      <span className="material-icons-outlined">
                        restart_alt
                      </span>
                      <span>Reset</span>
                    </span>
                    <span>
                      <span className="material-icons-outlined">logout</span>
                      <span>Quit</span>
                    </span>
                  </div>
                )}
              </span>
              <button id="review-btn">Review (20)</button>
            </div>
          )}
        </div>
      )}
      {location === 'details' && (
        <div id="deck-details-card" className="deck-card">
          <div>214/2000 cards learned (14 mastered)</div>
          <ProgressBar progress={10} styles={{ margin: '10px 0' }} />
          <div id="deck-bottom">
            <span id="deck-options" onClick={() => setOpenMenu(!openMenu)}>
              <span className="material-icons-outlined">expand_more</span>
              <span>Options</span>
              {openMenu && (
                <div id="options-menu">
                  <span>
                    <span className="material-icons-outlined">restart_alt</span>
                    <span>Reset</span>
                  </span>
                  <span>
                    <span className="material-icons-outlined">logout</span>
                    <span>Quit</span>
                  </span>
                </div>
              )}
            </span>
            <button id="review-btn">Review (20)</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeckCard;

/*


 */
