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
import styles from './Browse.module.scss';

const Browse = () => {
  const { userInfo } = useUser();
  const history = useHistory();
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [limit, setLimit] = useState(6);
  const { loading, data, error } = useQuery(GET_BROWSE_DATA, {
    variables: { limit },
    onError: () => {},
  });

  const menuRef = useClickOutside(() => {
    if (openMenu) setOpenMenu(false);
  });

  useEffect(() => !userInfo && history.push('/'));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.btns}>
          <Link
            to="/create-deck"
            className={`material-icons-outlined ${styles.mobileBtn}`}
            title="Create a deck"
          >
            add
          </Link>
          <span
            className={`material-icons-outlined ${styles.mobileBtn}`}
            title="Open filters"
            onMouseDown={() => setOpenMenu(!openMenu)}
          >
            filter_alt
          </span>
        </div>

        <div
          className={styles.sidebar}
          style={{ display: openMenu ? 'block' : 'none' }}
        >
          <Link className={styles.createDeckDesktop} to="/create-deck">
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
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default Browse;
