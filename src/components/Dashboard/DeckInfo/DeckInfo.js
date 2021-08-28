import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useState } from 'react';

const DeckInfo = ({ deck }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="deck-info">
      <img src={deck.img} alt={deck.title} />
      <span>{deck.title}</span>
      <ProgressBar progress={deck.progress} />
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
    </div>
  );
};

export default DeckInfo;
