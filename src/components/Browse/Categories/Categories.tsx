import { category } from 'types/Category';
import styles from './Categories.module.scss';

interface Props {
  categories: category[];
  categoryFilter: string;
  setCategoryFilter: Function;
  menuRef: React.RefObject<HTMLDivElement>;
}

const Categories = ({
  categories,
  categoryFilter,
  setCategoryFilter,
  menuRef,
}: Props) => {
  return (
    <div ref={menuRef} className={styles.container}>
      <span>{categoryFilter ? categoryFilter : 'All Categories'}</span>
      <div
        onClick={() => setCategoryFilter('')}
        style={{ cursor: 'pointer' }}
        className={!categoryFilter ? styles.active : ''}
      >
        <span className={`material-icons-outlined ${styles.menu}`}>menu</span>
        <span>All Categories</span>
      </div>
      <ul>
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              onClick={(e) =>
                setCategoryFilter((e.target as HTMLLIElement).innerText)
              }
              className={category.name === categoryFilter ? styles.active : ''}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
