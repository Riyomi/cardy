import DeckBody from 'components/DeckDetails/DeckBody/DeckBody';
import DeckHeader from 'components/DeckDetails/DeckHeader/DeckHeader';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';
import { GET_DECK } from 'queries/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router';

const DeckDetails = () => {
  const { id } = useParams();
  const { userInfo } = useUser();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });

  useEffect(() => !userInfo && history.push('/'));

  if (error) return <Error message="Not Found" />;
  if (loading) return <Loading />;

  return (
    <>
      <DeckHeader deck={data.deck} />
      <DeckBody deck={data.deck} />
    </>
  );
};

export default DeckDetails;
