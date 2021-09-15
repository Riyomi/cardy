import { useUser } from 'contexts/UserContext';
import { MENU } from '../../../constants';
import { isActive } from 'utils/utils';

const DeckMenu = ({ showMenu, setShowMenu, deck }) => {
  const { userInfo } = useUser();

  return (
    <div id="deck-details-menu">
      <span
        className={isActive(showMenu === MENU.OVERVIEW)}
        onClick={() => setShowMenu(MENU.OVERVIEW)}
      >
        Overview
      </span>
      <span
        className={isActive(showMenu === MENU.CARDS)}
        onClick={() => setShowMenu(MENU.CARDS)}
      >
        Cards
      </span>
      {userInfo.id === deck.user.id && (
        <span
          className={isActive(showMenu === MENU.EDIT)}
          onClick={() => setShowMenu(MENU.EDIT)}
        >
          Edit
        </span>
      )}
    </div>
  );
};

export default DeckMenu;
