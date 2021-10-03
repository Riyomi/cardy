import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import FormField from 'components/common/FormField/FormField';
import Select from 'react-select';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';
import styles from './EditDeck.module.scss';
import {
  CHANGE_VISIBILITY,
  EDIT_DECK,
  GET_CATEGORIES,
  GET_DECK,
  GET_BROWSE_DATA,
} from 'queries/queries';
import { deck } from 'types/Deck';
import { category } from 'types/Category';

interface Props {
  deck: deck;
}

const EditDeck = ({ deck }: Props) => {
  const [title, setTitle] = useState(deck.title);
  const [categoryId, setCategoryId] = useState(deck.category.id);
  const [visibility, setVisibilty] = useState(
    deck.publicId ? 'Public' : 'Private'
  );

  const {
    data,
    loading: loadingCategories,
    error,
  } = useQuery(GET_CATEGORIES, {
    onError: () => {},
  });

  const options = {
    onError: () => {},
    refetchQueries: [
      { query: GET_BROWSE_DATA },
      { query: GET_DECK, variables: { id: deck.id } },
    ],
  };

  const [editDeck, { loading: savingChanges }] = useMutation(
    EDIT_DECK,
    options
  );
  const [changeVisibility, { loading: savingNewVisbility }] = useMutation(
    CHANGE_VISIBILITY,
    options
  );

  const handleEditDeck = (e: React.FormEvent<HTMLFormElement>) => {
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

  if (loadingCategories || savingChanges || savingNewVisbility)
    return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className={styles.wrapper}>
        <h3>Edit deck info</h3>
        <form onSubmit={(e) => handleEditDeck(e)}>
          <FormField
            name="Title"
            type="text"
            value={title}
            setValue={setTitle}
            required={true}
            classes={styles.fieldWrapper}
          />
          <div className={styles.fieldWrapper}>
            <label>Category</label>
            {data && (
              <Select
                defaultValue={{
                  value: deck.category.id,
                  label: deck.category.name,
                }}
                options={data.categories.map((category: category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selected) => setCategoryId(selected!.value)}
              />
            )}
          </div>
          <div className={styles.fieldWrapper}>
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
              onChange={(selected) => setVisibilty(selected!.value)}
            />
          </div>
          <input type="submit" value="Save changes" />
        </form>
      </div>
    </>
  );
};

export default EditDeck;
