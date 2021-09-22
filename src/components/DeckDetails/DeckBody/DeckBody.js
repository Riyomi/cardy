import { useState } from 'react';
import { MENU } from '../../../constants';
import { useMutation } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import { GET_DECK, OPT_OUT } from 'queries/queries';
import CardsList from '../CardsList/CardsList';
import DeckMenu from '../DeckMenu/DeckMenu';
import DeckCard from 'components/common/DeckCard/DeckCard';
import EditDeck from '../EditDeck/EditDeck';
import DistributionChart from 'components/common/DistributionChart/DistributionChart';

const DeckBody = ({ deck }) => {
  const [showMenu, setShowMenu] = useState(MENU.OVERVIEW);
  const { userInfo } = useUser();

  const [optOut] = useMutation(OPT_OUT, {
    onError: () => {},
    refetchQueries: [{ query: GET_DECK, variables: { id: deck.id } }],
  });

  const handleOptOut = () =>
    window.confirm('Are you sure you want to opt out of synching?') &&
    optOut({ variables: { id: deck.id } });

  return (
    <>
      <DeckMenu showMenu={showMenu} setShowMenu={setShowMenu} deck={deck} />
      <div id="deck-body">
        {showMenu === MENU.OVERVIEW && (
          <>
            <DeckCard deck={deck} />
            <DistributionChart deck={deck} />
            <div id="review-forecast">Review forecast graph</div>
          </>
        )}
        {showMenu === MENU.CARDS && (
          <CardsList
            deck={deck}
            editable={
              userInfo.id === deck.user.id &&
              (!deck.publicId || deck.id === deck.publicId)
            }
          />
        )}
        {showMenu === MENU.EDIT && (
          <div className="edit-deck">
            {deck.id !== deck.publicId && deck.publicId && (
              <p>
                You currently cannot edit this deck because it is synched. If
                you want to make any changes, either opt out of synching by
                <strong style={{ cursor: 'pointer' }} onClick={handleOptOut}>
                  {' clicking here '}
                </strong>
                or ask the owner of the original deck.
              </p>
            )}
            {deck.user.id === userInfo.id &&
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
