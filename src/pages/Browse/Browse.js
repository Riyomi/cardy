import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BROWSE_DATA } from 'queries/queries';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router';
import { filterDecks } from 'utils/utils';
import Error from 'components/common/Error/Error';
import Loading from 'components/common/Loading/Loading';
import DeckList from 'components/Browse/DeckList/DeckList';
import Searchbar from 'components/Browse/Searchbar/Searchbar';
import Categories from 'components/Browse/Categories/Categories';
import { useClickOutside } from 'useClickOutside';

const Browse = () => {
  const { userInfo } = useUser();
  const history = useHistory();
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const { loading, data, error } = useQuery(GET_BROWSE_DATA, {
    onError: () => {},
  });

  const menuRef = useClickOutside(() => {
    if (openMenu) setOpenMenu(false);
  });

  useEffect(() => !userInfo && history.push('/'));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div id="browse-content">
      <div>
        <div id="action-btns">
          <Link
            to="/create-deck"
            className="material-icons-outlined mobile-action-btn"
            title="Create a deck"
          >
            add
          </Link>
          <span
            className="material-icons-outlined  mobile-action-btn"
            title="Open filters"
            onMouseDown={() => setOpenMenu(!openMenu)}
          >
            filter_alt
          </span>
        </div>

        <div
          id="browse-sidebar"
          style={{ display: openMenu ? 'block' : 'none' }}
        >
          <Link id="create-deck-desktop" to="/create-deck" className="btn">
            Create a deck
          </Link>
          <Categories
            menuRef={menuRef}
            categories={data.categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>
      <div>
        <Searchbar setSearchFilter={setSearchFilter} />
        <DeckList
          decks={filterDecks(data, categoryFilter, searchFilter)}
          searchFilter={searchFilter}
          categoryFilter={categoryFilter}
        />
      </div>
    </div>
  );
};

export default Browse;
