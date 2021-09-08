const DeckMenu = ({ showMenu, setShowMenu, MENU }) => {
  return (
    <div id="deck-details-menu">
      <span
        className={showMenu === MENU.OVERVIEW ? 'active' : ''}
        onClick={() => setShowMenu(MENU.OVERVIEW)}
      >
        Overview
      </span>
      <span
        className={showMenu === MENU.CARDS ? 'active' : ''}
        onClick={() => setShowMenu(MENU.CARDS)}
      >
        Cards
      </span>
      <span
        className={showMenu === MENU.EDIT ? 'active' : ''}
        onClick={() => setShowMenu(MENU.EDIT)}
      >
        Edit
      </span>
    </div>
  );
};

export default DeckMenu;
