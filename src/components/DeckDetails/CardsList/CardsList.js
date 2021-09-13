import { useMutation } from '@apollo/client';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import { useUser } from 'contexts/UserContext';
import { CREATE_CARD, DELETE_CARD, EDIT_CARD, GET_DECK } from 'queries/queries';
import { useState } from 'react';
import { timeLeftUntilReview } from 'utils/utils';

const CardsList = ({ deck, editable }) => {
  const { id: deckId, user, cards } = deck;

  const { userInfo } = useUser();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [editRow, setEditRow] = useState({
    index: -1,
    front: '',
    back: '',
  });

  const options = {
    refetchQueries: [{ query: GET_DECK, variables: { id: deckId } }],
  };

  const [createCard, { error: createError }] = useMutation(
    CREATE_CARD,
    options
  );
  const [editCard, { error: editError }] = useMutation(EDIT_CARD, options);
  const [deleteCard] = useMutation(DELETE_CARD, options);

  const handleCreateCard = async () => {
    if (!front || !back) return;

    try {
      await createCard({
        variables: {
          deckId,
          front,
          back,
        },
      });
      setFront('');
      setBack('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCard = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard({
          variables: {
            id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditCard = async (card) => {
    const { front, back } = editRow;

    if (!front || !back || (card.front === front && card.back === back))
      return setEditRow({ index: -1, front: '', back: '' });

    try {
      await editCard({
        variables: {
          id: card.id,
          front,
          back,
        },
      });
      setEditRow({ index: -1, front: '', back: '' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="cards-list">
      {createError && (
        <PopupMessage message={createError.message} type="error" />
      )}
      {editError && <PopupMessage message={editError.message} type="error" />}
      <h3>Cards ({cards.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Front</th>
            <th>Back</th>
            {userInfo && user.id === userInfo?.id && <th>Next review</th>}
            {editable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) =>
            editRow.index === index &&
            userInfo.id === user.id &&
            deck.publicId === deck.id ? (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={editRow.front}
                    onChange={(e) =>
                      setEditRow({
                        index: index,
                        front: e.target.value,
                        back: editRow.back,
                      })
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleEditCard(card)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editRow.back}
                    onChange={(e) =>
                      setEditRow({
                        index: index,
                        front: editRow.front,
                        back: e.target.value,
                      })
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleEditCard(card)
                    }
                  />
                </td>
                <td></td>
                <td>
                  <span
                    className="material-icons icon-btn"
                    onClick={() => handleEditCard(card)}
                  >
                    check_circle
                  </span>
                </td>
              </tr>
            ) : (
              <tr
                key={index}
                onDoubleClick={() =>
                  setEditRow({
                    index: index,
                    front: card.front,
                    back: card.back,
                  })
                }
              >
                <td>#{index + 1}</td>
                <td>{card.front}</td>
                <td>{card.back}</td>
                {userInfo && user.id === userInfo?.id && (
                  <td>{timeLeftUntilReview(card)}</td>
                )}
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
            )
          )}
          {editable && (
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCard()}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCard()}
                />
              </td>
              {userInfo && user.id === userInfo?.id && <td></td>}
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
