import { gql, useQuery } from '@apollo/client';
import DeckBody from 'components/DeckDetails/DeckBody/DeckBody';
import DeckHeader from 'components/DeckDetails/DeckHeader/DeckHeader';
import { useParams } from 'react-router-dom';

const DeckDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });

  return (
    <>
      {error}
      {!loading && (
        <div>
          <DeckHeader deck={data.deck} />
          <DeckBody deck={data.deck} />
        </div>
      )}
    </>
  );
};

const GET_DECK = gql`
  query getDeck($id: ID) {
    deck(id: $id) {
      id
      title
      img
      learners
      cards {
        front
        back
      }
      createdBy {
        name
      }
    }
  }
`;

export default DeckDetails;
