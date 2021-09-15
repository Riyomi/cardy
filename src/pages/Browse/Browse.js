import { useQuery } from '@apollo/client';
import DeckList from 'components/Browse/DeckList/DeckList';
import Searchbar from 'components/Browse/Searchbar/Searchbar';
import Categories from 'components/Browse/Categories/Categories';
import { useState } from 'react';
import { GET_DECKS } from 'queries/queries';
import { Link } from 'react-router-dom';

const Browse = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { error, data } = useQuery(GET_DECKS);

  const filterDecks = () => {
    if (categoryFilter) {
      return data.decks.filter(
        (deck) =>
          deck.category.name === categoryFilter &&
          deck.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    return data.decks.filter((deck) =>
      deck.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
  };

  return (
    <div id="browse-content">
      <div>
        <Link to="/create-deck" className="btn">
          Create a deck
        </Link>
        <Categories
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <div>
        <Searchbar setSearchFilter={setSearchFilter} />
        {data && <DeckList decks={filterDecks()} />}
        {error && <p>Failed to fetch data from the server.</p>}
      </div>
    </div>
  );
};

export default Browse;
