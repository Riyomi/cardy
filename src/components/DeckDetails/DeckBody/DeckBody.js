import { useState } from 'react';
import { MENU } from '../../../constants';
import { useMutation } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import { GET_DECK, OPT_OUT } from 'queries/queries';
import CardList from '../CardList/CardList';
import DeckMenu from '../DeckMenu/DeckMenu';
import DeckCard from 'components/common/DeckCard/DeckCard';
import EditDeck from '../EditDeck/EditDeck';
import DistributionChart from '../DistributionChart/DistributionChart';
import ReviewForecast from '../ReviewForecast/ReviewForecast';
import styles from './DeckBody.module.scss';

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
      <div className={styles.body}>
        {showMenu === MENU.OVERVIEW && (
          <>
            <DeckCard deck={deck} />
            {userInfo.id === deck.user.id && (
              <>
                <DistributionChart deck={deck} />
                <ReviewForecast deck={deck} />
              </>
            )}
          </>
        )}
        {showMenu === MENU.CARDS && (
          <CardList
            deck={deck}
            editable={
              userInfo.id === deck.user.id &&
              (!deck.publicId || deck.id === deck.publicId)
            }
          />
        )}
        {showMenu === MENU.EDIT && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default DeckBody;
