import { useUser } from 'contexts/UserContext';

const DeckMenu = ({ showMenu, setShowMenu, MENU, deck }) => {
  const { userInfo: user } = useUser();

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
      {user && user?.id === deck.user.id && (
        <span
          className={showMenu === MENU.EDIT ? 'active' : ''}
          onClick={() => setShowMenu(MENU.EDIT)}
        >
          Edit
        </span>
      )}
    </div>
  );
};

export default DeckMenu;
