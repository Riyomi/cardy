import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeckList from 'components/Browse/DeckList/DeckList';
import Searchbar from 'components/Browse/Searchbar/Searchbar';
import Categories from 'components/Browse/Categories/Categories';
import { useQuery } from '@apollo/client';
import { GET_BROWSE_DATA } from 'queries/queries';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router';

const Browse = () => {
  const { userInfo } = useUser();
  const history = useHistory();
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { loading, data, error } = useQuery(GET_BROWSE_DATA, {
    onError: () => {},
  });

  const filterDecks = () => {
    return data
      ? data.decks.filter(
          ({ category, title }) =>
            (categoryFilter ? category.name === categoryFilter : true) &&
            title.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : [];
  };

  useEffect(() => !userInfo && history.push('/'));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div id="browse-content">
      <div>
        <Link to="/create-deck" className="btn">
          Create a deck
        </Link>
        <Categories
          categories={data.categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <div>
        <Searchbar setSearchFilter={setSearchFilter} />
        <DeckList
          decks={filterDecks()}
          searchFilter={searchFilter}
          categoryFilter={categoryFilter}
        />
      </div>
    </div>
  );
};

export default Browse;
