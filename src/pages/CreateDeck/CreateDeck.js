import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_DECK,
  GET_CATEGORIES,
  GET_DECKS,
  GET_USER,
} from 'queries/queries';
import { useState } from 'react';
import FormField from 'components/common/FormField/FormField';
import { useUser } from 'contexts/UserContext';
import { Redirect, useHistory } from 'react-router-dom';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';
import Select from 'react-select';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [img /*setImg*/] = useState(undefined);
  const [categoryId, setCategoryId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const history = useHistory();
  const { userInfo } = useUser();

  const [createDeck, { error }] = useMutation(CREATE_DECK, {
    onCompleted: (data) => {
      setSuccess(true);
      setMessage('Successfully created deck ' + data.createDeck.title);
      setTimeout(() => {
        history.push('/');
      }, 2000);
    },
    refetchQueries: [
      { query: GET_DECKS },
      { query: GET_USER, variables: { id: userInfo?.id } },
    ],
  });
  const { data } = useQuery(GET_CATEGORIES);

  if (!userInfo) return <Redirect to="/login" />;

  const handleCreateDeck = (e) => {
    e.preventDefault();

    createDeck({ variables: { title, img, categoryId } }).catch((err) =>
      console.log(err)
    );
  };

  return (
    <div>
      {error && <PopupMessage message={error.message} type="error" />}
      {success && <PopupMessage message={message} type="success" />}
      {data && (
        <div className="form-wrapper">
          <div className="sidebar">Create deck </div>
          <div className="form-main ">
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
                  options={data.categories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  onChange={(selected) => setCategoryId(selected.value)}
                ></Select>
              </div>
              <div className="field-wrapper">
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose image
                </label>
                <input id="file-upload" type="file" />
              </div>
              <input type="submit" value="Create deck" className="submit-btn" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDeck;
