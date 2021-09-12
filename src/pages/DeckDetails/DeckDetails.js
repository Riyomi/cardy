import { useQuery } from '@apollo/client';
import DeckBody from 'components/DeckDetails/DeckBody/DeckBody';
import DeckHeader from 'components/DeckDetails/DeckHeader/DeckHeader';
import { GET_DECK } from 'queries/queries';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';

const DeckDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });

  return (
    <>
      {error && <Redirect to="/404" />}
      {!loading && data && (
        <>
          <DeckHeader deck={data.deck} />
          <DeckBody deck={data.deck} />
        </>
      )}
    </>
  );
};

export default DeckDetails;
