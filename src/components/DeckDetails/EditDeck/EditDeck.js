import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import FormField from 'components/common/FormField/FormField';
import Select from 'react-select';
import {
  CHANGE_VISIBILITY,
  EDIT_DECK,
  GET_CATEGORIES,
  GET_DECK,
  GET_DECKS,
} from 'queries/queries';

const EditDeck = ({ deck }) => {
  const [title, setTitle] = useState(deck.title);
  const [categoryId, setCategoryId] = useState(deck.category.id);
  const [visibility, setVisibilty] = useState(
    deck.publicId ? 'Public' : 'Private'
  );
  const { data } = useQuery(GET_CATEGORIES);

  const options = {
    onError: () => {},
    refetchQueries: [
      { query: GET_DECKS },
      { query: GET_DECK, variables: { id: deck.id } },
    ],
  };

  const [editDeck] = useMutation(EDIT_DECK, options);
  const [changeVisibility] = useMutation(CHANGE_VISIBILITY, options);

  const handleEditDeck = (e) => {
    e.preventDefault();

    const visibilityChanged =
      (visibility === 'Public' && !deck.publicId) ||
      (visibility === 'Private' && deck.publicId);

    if (
      title === deck.title &&
      categoryId === deck.category.id &&
      !visibilityChanged
    )
      return;

    if (visibilityChanged) {
      const message = `Are you sure you want to change the deck's visibility to ${
        deck.publicId ? 'private' : 'public'
      }?`;

      if (window.confirm(message)) {
        changeVisibility({ variables: { id: deck.id } });
      }
    }

    editDeck({ variables: { id: deck.id, title, categoryId } });
  };

  return (
    <div>
      <div id="edit-deck-info">
        <h3>Edit deck info</h3>
        <form onSubmit={(e) => handleEditDeck(e)} className="edit-deck-form">
          <FormField
            name="Title"
            type="text"
            value={title}
            setValue={setTitle}
            required={true}
          />
          <div className="field-wrapper">
            <label>Category</label>
            {data && (
              <Select
                defaultValue={{
                  value: deck.category.id,
                  label: deck.category.name,
                }}
                options={data.categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selected) => setCategoryId(selected.value)}
              />
            )}
          </div>
          <div className="field-wrapper">
            <label>Visibility</label>
            <Select
              defaultValue={{
                value: deck.publicId ? 'Public' : 'Private',
                label: deck.publicId ? 'Public' : 'Private',
              }}
              options={[
                { value: 'Private', label: 'Private' },
                { value: 'Public', label: 'Public' },
              ]}
              onChange={(selected) => setVisibilty(selected.value)}
            />
          </div>
          <input type="submit" className="submit-btn" value="Save changes" />
        </form>
      </div>
    </div>
  );
};

export default EditDeck;
