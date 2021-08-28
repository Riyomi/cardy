import axios from 'axios';
import DeckList from 'components/Browse/DeckList/DeckList';
import Searchbar from 'components/Browse/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import Categories from '../../components/Browse/Categories/Categories';

const Browse = () => {
  const [decks, setDecks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/decks').then((res) => {
      setDecks(res.data);
      setIsPending(false);
    });
    axios.get('http://localhost:8080/categories').then((res) => {
      setCategories(res.data);
      setIsPending(false);
    });
  }, []);

  const filterDecks = () => {
    if (categoryFilter) {
      return decks.filter(
        (deck) =>
          deck.category === categoryFilter &&
          deck.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    return decks.filter((deck) =>
      deck.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
  };

  return (
    <div id="browse-content">
      <Categories
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <div>
        <Searchbar setSearchFilter={setSearchFilter} />
        {isPending && <div>Loading...</div>}
        {!isPending && <DeckList decks={filterDecks()} />}
      </div>
    </div>
  );
};

export default Browse;
