import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from 'queries/queries';

const Categories = ({ categoryFilter, setCategoryFilter }) => {
  const { loading, data } = useQuery(GET_CATEGORIES);

  return (
    <>
      {data && (
        <div id="categories">
          <span id="categories-title">Language</span>
          <div
            onClick={() => setCategoryFilter('')}
            style={{ cursor: 'pointer' }}
            className={!categoryFilter ? 'active-category' : ''}
          >
            <span className="material-icons-outlined">menu</span>
            <span>All Categories</span>
          </div>
          <ul>
            {data.categories.map((category) => (
              <li
                key={category.id}
                onClick={(e) => setCategoryFilter(e.target.innerText)}
                className={
                  category.name === categoryFilter ? 'active-category' : ''
                }
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && !data && <p>Loading...</p>}
    </>
  );
};

export default Categories;
