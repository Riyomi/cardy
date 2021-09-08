import { useMutation } from '@apollo/client';
import { CREATE_CARD, DELETE_CARD, GET_DECK } from 'queries/queries';
import { useState } from 'react';

const CardsList = ({ deckId, cards, editable }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [createCard] = useMutation(CREATE_CARD, {
    refetchQueries: [{ query: GET_DECK, variables: { id: deckId } }],
  });
  const [deleteCard] = useMutation(DELETE_CARD, {
    refetchQueries: [{ query: GET_DECK, variables: { id: deckId } }],
  });

  const handleCreateCard = async () => {
    try {
      await createCard({
        variables: {
          deckId: deckId,
          front: front,
          back: back,
        },
      });
      setFront('');
      setBack('');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteCard = async (id) => {
    console.log(id);
    try {
      await deleteCard({
        variables: {
          id: id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="cards-list">
      <h3>Cards ({cards.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Front</th>
            <th>Back</th>
            {editable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{card.front}</td>
              <td>{card.back}</td>
              {editable && (
                <td>
                  <span
                    className="material-icons-outlined icon-btn"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    remove_circle
                  </span>
                </td>
              )}
            </tr>
          ))}
          {editable && (
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  required
                />
              </td>
              <td>
                <span
                  className="material-icons-outlined icon-btn"
                  onClick={handleCreateCard}
                >
                  add_circle
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardsList;
