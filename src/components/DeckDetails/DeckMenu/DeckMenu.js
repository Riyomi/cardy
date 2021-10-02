import { useUser } from 'contexts/UserContext';
import { MENU } from '../../../constants';
import styles from './DeckMenu.module.scss';

const DeckMenu = ({ showMenu, setShowMenu, deck }) => {
  const { userInfo } = useUser();

  return (
    <div className={styles.wrapper}>
      <span
        className={showMenu === MENU.OVERVIEW ? styles.active : ''}
        onClick={() => setShowMenu(MENU.OVERVIEW)}
      >
        Overview
      </span>
      <span
        className={showMenu === MENU.CARDS ? styles.active : ''}
        onClick={() => setShowMenu(MENU.CARDS)}
      >
        Cards
      </span>
      {userInfo.id === deck.user.id && (
        <span
          className={showMenu === MENU.EDIT ? styles.active : ''}
          onClick={() => setShowMenu(MENU.EDIT)}
        >
          Edit
        </span>
      )}
    </div>
  );
};

export default DeckMenu;
