import DeckCard from 'components/common/DeckCard/DeckCard';
import { useUser } from 'contexts/UserContext';
import { useState } from 'react';
import CardsList from '../CardsList/CardsList';
import DeckMenu from '../DeckMenu/DeckMenu';

const DeckBody = ({ deck }) => {
  const { userInfo: user } = useUser();

  const MENU = {
    OVERVIEW: 0,
    CARDS: 1,
    EDIT: 2,
  };
  const [showMenu, setShowMenu] = useState(MENU.OVERVIEW);

  return (
    <>
      <DeckMenu showMenu={showMenu} setShowMenu={setShowMenu} MENU={MENU} />
      <div id="deck-body">
        {showMenu === MENU.OVERVIEW && (
          <>
            <DeckCard deck={deck} location="details" />
            <div id="card-distribution">Card distribution graph</div>
            <div id="review-forecast">Review forecast graph</div>
          </>
        )}
        {showMenu === MENU.CARDS && (
          <CardsList
            cards={deck.cards}
            deckId={deck.id}
            editable={
              user.id === deck.user.id &&
              (deck.id === deck.publicId || !deck.publicId)
            }
          />
        )}
        {showMenu === MENU.EDIT && (
          <div>
            <p>Edit deck info</p>
            {deck.id !== deck.publicId && deck.publicId && (
              <p>
                You currently cannot edit this deck because it is synched. If
                you want to make any changes, either opt out of synching by{' '}
                <a href="placeholder" style={{ color: 'black' }}>
                  clicking here
                </a>{' '}
                or ask{' '}
                <a href="placeholder" style={{ color: 'black' }}>
                  the owner
                </a>{' '}
                of the original deck.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DeckBody;
