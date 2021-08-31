import { gql, useQuery } from '@apollo/client';
import DeckList from 'components/Browse/DeckList/DeckList';
import Searchbar from 'components/Browse/Searchbar/Searchbar';
import Categories from 'components/Browse/Categories/Categories';
import { useState } from 'react';

const Browse = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { loading, error, data } = useQuery(GET_DECKS_AND_CATEGORIES);

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
      {error}
      {console.log(data)}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Categories
            categories={data.categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <div>
            <Searchbar setSearchFilter={setSearchFilter} />
            <DeckList decks={filterDecks()} />
          </div>
        </>
      )}
    </div>
  );
};

const GET_DECKS_AND_CATEGORIES = gql`
  query getDecksAndCategories {
    decks {
      id
      title
      img
      category {
        name
      }
      createdBy {
        name
      }
      cards {
        front
        back
      }
      learners
    }
    categories {
      id
      name
    }
  }
`;

export default Browse;
