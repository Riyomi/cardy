import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_DECK,
  GET_CATEGORIES,
  GET_BROWSE_DATA,
  GET_USER,
} from 'queries/queries';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router-dom';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import FormField from 'components/common/FormField/FormField';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const history = useHistory();
  const { userInfo } = useUser();

  const { data, loading, error: queryError } = useQuery(GET_CATEGORIES);

  const [createDeck, { error }] = useMutation(CREATE_DECK, {
    onError: () => {},
    onCompleted: (data) => history.push('/deck/' + data.createDeck.id),
    refetchQueries: [
      { query: GET_BROWSE_DATA },
      { query: GET_USER, variables: { id: userInfo?.id } },
    ],
  });

  const handleCreateDeck = (e) => {
    e.preventDefault();
    createDeck({ variables: { title, categoryId } });
  };

  useEffect(() => !userInfo && history.push('/login'));

  if (loading) return <Loading />;
  if (queryError) return <Error />;

  return (
    <div>
      {error && <PopupMessage message={error.message} type="error" />}
      <div className="form-wrapper">
        <div className="sidebar">Create deck</div>
        <div className="form-main">
          <form
            onSubmit={(e) => handleCreateDeck(e)}
            className="user-form deck-creation-form"
          >
            <h2>Deck information</h2>
            <FormField
              name="Title"
              type="text"
              value={title}
              setValue={setTitle}
              required={true}
            />
            <div className="field-wrapper">
              <label>Category</label>
              <Select
                options={data.categories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
                onChange={(selected) => setCategoryId(selected.value)}
              ></Select>
            </div>
            {/* // UPLOAD IMAGE FIELD - not yet implemented
              <div className="field-wrapper">
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose image
                </label>
                <input id="file-upload" type="file" />
              </div> */}
            <input type="submit" value="Create deck" className="submit-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
