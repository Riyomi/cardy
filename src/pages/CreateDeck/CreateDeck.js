import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DECK, GET_CATEGORIES } from 'queries/queries';
import { useState } from 'react';
import FormField from 'components/common/FormField/FormField';
import { useUser } from 'contexts/UserContext';
import { Redirect } from 'react-router-dom';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(undefined);
  const [isPublic, setIsPublic] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [createDeck] = useMutation(CREATE_DECK);
  const { data } = useQuery(GET_CATEGORIES);
  const { userInfo } = useUser();

  if (!userInfo) return <Redirect to="/login" />;

  const handleCreateDeck = async (e) => {
    e.preventDefault();

    try {
      const deck = await createDeck({
        variables: { title, img: img ? img : null, isPublic, categoryId },
      });

      console.log(deck);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {data && (
        <form onSubmit={(e) => handleCreateDeck(e)}>
          <FormField
            name="Title"
            type="text"
            value={title}
            setValue={setTitle}
            required={true}
          />
          <FormField
            name="Image (optional)"
            type="file"
            value={img}
            setValue={setImg}
          />
          <FormField
            name="Make Public"
            type="checkbox"
            value={isPublic}
            setValue={setIsPublic}
          />
          <div className="field-wrapper">
            <label>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              defaultValue={data.categories[0].id}
            >
              {data.categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input type="submit" value="Create deck" className="btn" />
        </form>
      )}
    </div>
  );
};

export default CreateDeck;
