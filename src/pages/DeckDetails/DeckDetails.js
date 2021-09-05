import { useQuery } from '@apollo/client';
import DeckBody from 'components/DeckDetails/DeckBody/DeckBody';
import DeckHeader from 'components/DeckDetails/DeckHeader/DeckHeader';
import { GET_DECK } from 'queries/queries';
import { useParams } from 'react-router-dom';

const DeckDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });

  return (
    <>
      {error && error.message}
      {!loading && data && (
        <div>
          <DeckHeader deck={data.deck} />
          <DeckBody deck={data.deck} />
        </div>
      )}
    </>
  );
};

export default DeckDetails;
