import DeckCard from 'components/common/DeckCard/DeckCard';
import { useUser } from 'contexts/UserContext';
import { useState } from 'react';
import CardsList from '../CardsList/CardsList';
import DeckMenu from '../DeckMenu/DeckMenu';
import EditDeck from '../EditDeck/EditDeck';

const DeckBody = ({ deck }) => {
  const MENU = {
    OVERVIEW: 0,
    CARDS: 1,
    EDIT: 2,
  };

  const [showMenu, setShowMenu] = useState(MENU.OVERVIEW);
  const { userInfo: user } = useUser();

  return (
    <>
      <DeckMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        MENU={MENU}
        deck={deck}
      />
      <div id="deck-body">
        {showMenu === MENU.OVERVIEW && (
          <>
            <DeckCard deck={deck} />
            <div id="card-distribution">Card distribution graph</div>
            <div id="review-forecast">Review forecast graph</div>
          </>
        )}
        {showMenu === MENU.CARDS && (
          <CardsList
            deck={deck}
            editable={
              user?.id === deck.user.id &&
              (deck.id === deck.publicId || !deck.publicId)
            }
          />
        )}
        {showMenu === MENU.EDIT && (
          <div className="edit-deck">
            {deck?.id !== deck?.publicId && deck?.publicId && (
              <p>
                You currently cannot edit this deck because it is synched. If
                you want to make any changes, either opt out of synching by{' '}
                <strong>clicking here</strong> or ask <strong>the owner</strong>{' '}
                of the original deck.
              </p>
            )}
            {deck?.user.id === user?.id &&
              (!deck.publicId || deck.publicId === deck.id) && (
                <EditDeck deck={deck} />
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default DeckBody;
