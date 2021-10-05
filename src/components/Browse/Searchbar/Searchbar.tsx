import styles from './Searchbar.module.scss';

interface Props {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ setSearchFilter }: Props) => (
  <div className={styles.wrapper}>
    <input
      type="text"
      placeholder="start browsing..."
      onChange={(e) => setSearchFilter(e.target.value)}
    />
    <span className="material-icons-outlined">search</span>
  </div>
);

export default Searchbar;
